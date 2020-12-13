import json
import traceback

from pytube import YouTube, Stream


def getAllResolution(event, context):
    '''
    Lambda to get in video URL and response with resolutions available.
    '''
    # This header needs to be returned in response for client purposes (Preflight request and CORS policies)
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": True,
    }
    try:
        requestBody = json.loads(event["body"])
        videoUrl = requestBody["videoUrl"]
        youtubeVideo = YouTube(videoUrl)
        videoStreams = youtubeVideo.streams
        all_resolutions = set()
        for stream in videoStreams:
            if (stream.resolution is not None):
                all_resolutions.add(stream.resolution)
        body = {
            "message": "Success.",
            "all_resolutions": list(all_resolutions)
        }
        response = {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(body)
        }
        return response
    except Exception as e:
        print(traceback.format_exc())
        return {
            "statusCode": 500,
            "headers": headers,
            "body": traceback.format_exc()
        }