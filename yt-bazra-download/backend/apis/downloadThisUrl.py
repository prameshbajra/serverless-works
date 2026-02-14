import json
import boto3
import traceback

from backend.apis.youtube_utils import download_video_to_tmp, YouTubeAccessError


def downloadThisUrl(event, context):
    '''
    Lambda for POST method which takes in a video URL and returns a s3 download URL.
    '''
    # This header needs to be returned in response for client purposes (Preflight request and CORS policies)
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": True,
    }
    try:
        s3 = boto3.client('s3')

        requestBody = json.loads(event["body"])
        videoUrl = requestBody["videoUrl"]
        downloadResolution = requestBody.get("downloadResolution")

        videoFilePath, videoFileName = download_video_to_tmp(videoUrl, downloadResolution)
        s3.upload_file(videoFilePath, "yt-bazra-download-content", videoFileName)
        videoDownloadUrl = s3.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': "yt-bazra-download-content",
                'Key': videoFileName
            },
            ExpiresIn=300)

        body = {"message": "Success.", "videoDownloadUrl": videoDownloadUrl}
        response = {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(body)
        }
        return response
    except YouTubeAccessError as e:
        body = {
            "message": (
                "This video currently requires YouTube sign-in verification "
                "and cannot be downloaded anonymously."
            )
        }
        return {
            "statusCode": 403,
            "headers": headers,
            "body": json.dumps(body)
        }
    except Exception as e:
        print(traceback.format_exc())
        return {
            "statusCode": 500,
            "headers": headers,
            "body": traceback.format_exc()
        }
