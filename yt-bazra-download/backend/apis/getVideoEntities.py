import json
import traceback

from backend.apis.youtube_utils import get_video_entities


def getVideoEntities(event, context):
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
        videoEntities = get_video_entities(videoUrl)

        body = {
            "message": "Success.",
            "video_name": videoEntities["video_name"],
            "all_resolutions": videoEntities["all_resolutions"]
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
