import io
import json
import boto3
import traceback
from pytube import YouTube, Stream


def downloadThisUrl(event, context):
    try:
        s3 = boto3.client('s3')
        youtubeVideo = YouTube(
            'https://www.youtube.com/watch?v=uFjS8ZMyvNA&ab_channel=MatthewMoniz'
        )
        videoStream = youtubeVideo.streams.get_highest_resolution()
        videoFileName = videoStream.default_filename
        videoStream.download(f"/tmp/")
        s3.upload_file(f"/tmp/{videoFileName}", "yt-bazra-download-content",
                       videoFileName)
        body = {"message": "Got input", "input": event}
        response = {"statusCode": 200, "body": json.dumps(body)}
        return response
    except Exception as e:
        print(traceback.format_exc())
        return {"statusCode": 200, "body": traceback.format_exc()}
