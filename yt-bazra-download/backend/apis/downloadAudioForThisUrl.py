import io
import json
import boto3
import traceback

from pytube import YouTube, Stream


def downloadAudioForThisUrl(event, context):
    '''
    Lambda for POST method which takes in a video URL and returns a s3 download URL that has an audio file.
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
        youtubeVideo = YouTube(videoUrl)

        audioStream = youtubeVideo.streams.filter(only_audio=True).all()[0]
        audioFileName = audioStream.default_filename
        audioStream.download(f"/tmp/")

        s3.upload_file(f"/tmp/{audioFileName}", "yt-bazra-download-content", audioFileName)

        audioDownloadUrl = s3.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': "yt-bazra-download-content",
                'Key': audioFileName
            },
            ExpiresIn=300)

        body = {"message": "Success.", "audioDownloadUrl": audioDownloadUrl}
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
