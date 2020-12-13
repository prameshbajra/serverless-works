import json

from backend.apis.downloadThisUrl import downloadThisUrl


def download_without_resolution():
    fake_event = {
        "body":
        json.dumps({
            "videoUrl":
            "https://www.youtube.com/watch?v=a3TdQFV4y8k&ab_channel=FinnovationZUpdates"
        })
    }
    result = downloadThisUrl(fake_event, None)
    print(result)


def download_with_resolution():
    fake_event = {
        "body":
        json.dumps({
            "videoUrl":
            "https://www.youtube.com/watch?v=a3TdQFV4y8k&ab_channel=FinnovationZUpdates",
            "downloadResolution": "720p"
        })
    }
    result = downloadThisUrl(fake_event, None)
    print(result)


if __name__ == "__main__":
    download_without_resolution()
    download_with_resolution()
