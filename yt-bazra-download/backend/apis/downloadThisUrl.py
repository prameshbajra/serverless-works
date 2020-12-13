import io
import json
import boto3
import traceback

from pytube import YouTube, Stream


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
        downloadResolution = None

        youtubeVideo = YouTube(videoUrl)

        if ("downloadResolution" in requestBody):
            downloadResolution = requestBody["downloadResolution"]

        if (downloadResolution is None):
            videoStream = youtubeVideo.streams.get_highest_resolution()
        else:
            videoStream = youtubeVideo.streams.get_by_resolution(
                downloadResolution)
        videoFileName = videoStream.default_filename
        videoStream.download(f"/tmp/")
        s3.upload_file(f"/tmp/{videoFileName}", "yt-bazra-download-content",
                       videoFileName)
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
    except Exception as e:
        print(traceback.format_exc())
        return {
            "statusCode": 500,
            "headers": headers,
            "body": traceback.format_exc()
        }
