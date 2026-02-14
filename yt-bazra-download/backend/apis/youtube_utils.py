import base64
import glob
import os
import re


class YouTubeAccessError(Exception):
    pass


def _is_bot_challenge_error(error):
    message = str(error).lower()
    return (
        "sign in to confirm you're not a bot" in message or
        "sign in to confirm you\u2019re not a bot" in message or
        "use --cookies" in message or
        "login required" in message
    )


def _get_extractor_attempts():
    return (
        {},
        {"youtube": {"player_client": ["android"]}},
        {"youtube": {"player_client": ["ios"]}},
        {"youtube": {"player_client": ["tv_embedded"]}},
        {"youtube": {"player_client": ["android", "web"]}},
    )


def sort_resolutions_desc(resolutions):
    def resolution_key(resolution):
        if isinstance(resolution, str) and resolution.endswith("p"):
            value = resolution[:-1]
            if value.isdigit():
                return int(value)
        return 0

    return sorted(resolutions, key=resolution_key, reverse=True)


def _normalize_info(raw_info):
    if isinstance(raw_info, dict) and raw_info.get("entries"):
        for entry in raw_info["entries"]:
            if entry:
                return entry
    return raw_info


def _build_common_ydl_options():
    options = {
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        "retries": 2,
        "fragment_retries": 2,
        "http_headers": {
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            )
        },
    }
    cookiefile = _resolve_cookiefile()
    if cookiefile is not None:
        options["cookiefile"] = cookiefile
    return options


def _safe_title(title):
    cleaned = re.sub(r"[^\w\-. ]+", "_", (title or "").strip())
    return cleaned.strip(" .") or "video"


def _extract_video_info(video_url):
    YoutubeDL = _get_youtube_dl_class()
    last_error = None

    for extractor_args in _get_extractor_attempts():
        try:
            options = _build_common_ydl_options()
            if extractor_args:
                options["extractor_args"] = extractor_args
            with YoutubeDL(options) as ydl:
                return _normalize_info(ydl.extract_info(video_url, download=False))
        except Exception as error:
            last_error = error

    if _is_bot_challenge_error(last_error):
        raise YouTubeAccessError(
            "YouTube is requiring sign-in/cookies for this video."
        ) from last_error
    raise last_error


def _extract_resolution_label(stream_format):
    height = stream_format.get("height")
    if isinstance(height, int) and height > 0:
        return f"{height}p"

    format_note = stream_format.get("format_note")
    if isinstance(format_note, str) and format_note.endswith("p"):
        value = format_note[:-1]
        if value.isdigit():
            return format_note
    return None


def get_video_entities(video_url):
    info = _extract_video_info(video_url)
    formats = info.get("formats") or []
    resolutions = set()

    for stream_format in formats:
        if stream_format.get("vcodec") in (None, "none"):
            continue
        label = _extract_resolution_label(stream_format)
        if label is not None:
            resolutions.add(label)

    if not resolutions and isinstance(info.get("height"), int):
        resolutions.add(f"{info['height']}p")

    video_name = f"{_safe_title(info.get('title'))}.mp4"
    return {
        "video_name": video_name,
        "all_resolutions": sort_resolutions_desc(list(resolutions))
    }


def _resolution_to_height(download_resolution):
    if isinstance(download_resolution, str) and download_resolution.endswith("p"):
        value = download_resolution[:-1]
        if value.isdigit():
            return int(value)
    return None


def _resolve_download_path(info, ydl):
    requested_downloads = info.get("requested_downloads") or []
    for item in requested_downloads:
        if isinstance(item, dict) and item.get("filepath"):
            return item["filepath"]

    if info.get("filepath"):
        return info["filepath"]

    guessed_path = ydl.prepare_filename(info)
    if os.path.exists(guessed_path):
        return guessed_path

    base_name, _ = os.path.splitext(guessed_path)
    matching_paths = glob.glob(f"{base_name}.*")
    if matching_paths:
        return matching_paths[0]
    return guessed_path


def _download_to_tmp(video_url, format_selector):
    YoutubeDL = _get_youtube_dl_class()
    last_error = None

    for extractor_args in _get_extractor_attempts():
        try:
            options = _build_common_ydl_options()
            options.update({
                "format": format_selector,
                "outtmpl": "/tmp/%(title).180B-%(id)s.%(ext)s",
                "restrictfilenames": True,
            })
            if extractor_args:
                options["extractor_args"] = extractor_args

            with YoutubeDL(options) as ydl:
                info = _normalize_info(ydl.extract_info(video_url, download=True))
                file_path = _resolve_download_path(info, ydl)

            if not os.path.exists(file_path):
                raise Exception("Downloaded media file was not found in /tmp.")

            return file_path, os.path.basename(file_path)
        except Exception as error:
            last_error = error

    if _is_bot_challenge_error(last_error):
        raise YouTubeAccessError(
            "YouTube is requiring sign-in/cookies for this video."
        ) from last_error
    raise last_error


def download_video_to_tmp(video_url, download_resolution=None):
    height = _resolution_to_height(download_resolution)

    if height is None:
        format_selector = "best[ext=mp4][vcodec!=none][acodec!=none]/best[vcodec!=none][acodec!=none]"
    else:
        format_selector = (
            f"best[height={height}][ext=mp4][vcodec!=none][acodec!=none]/"
            f"best[height={height}][vcodec!=none][acodec!=none]/"
            f"best[height<={height}][ext=mp4][vcodec!=none][acodec!=none]/"
            f"best[height<={height}][vcodec!=none][acodec!=none]/"
            "best[ext=mp4][vcodec!=none][acodec!=none]/"
            "best[vcodec!=none][acodec!=none]"
        )

    return _download_to_tmp(video_url, format_selector)


def download_audio_to_tmp(video_url):
    return _download_to_tmp(video_url, "bestaudio[ext=m4a]/bestaudio")


def _get_youtube_dl_class():
    try:
        from yt_dlp import YoutubeDL
        return YoutubeDL
    except Exception as error:
        raise Exception(
            "yt-dlp dependency is unavailable in Lambda package. "
            "Redeploy after clearing serverless-python-requirements cache."
        ) from error


def _resolve_cookiefile():
    cookie_path = os.getenv("YTDLP_COOKIES_FILE")
    if cookie_path and os.path.exists(cookie_path):
        return cookie_path

    cookies_b64 = os.getenv("YTDLP_COOKIES_B64")
    if not cookies_b64:
        return None

    target_path = "/tmp/ytdlp_cookies.txt"
    if os.path.exists(target_path):
        return target_path

    try:
        decoded = base64.b64decode(cookies_b64).decode("utf-8")
        with open(target_path, "w", encoding="utf-8") as cookie_file:
            cookie_file.write(decoded)
        return target_path
    except Exception:
        return None
