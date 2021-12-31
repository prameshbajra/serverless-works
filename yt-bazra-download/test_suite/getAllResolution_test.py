import json
from backend.apis.getVideoEntities import getVideoEntities


def run_test():
    fake_event = {
        "body":
        json.dumps({
            "videoUrl":
            "https://www.youtube.com/watch?v=a3TdQFV4y8k&ab_channel=FinnovationZUpdates"
        })
    }
    result = getVideoEntities(fake_event, None)
    print(result)


if __name__ == "__main__":
    run_test()