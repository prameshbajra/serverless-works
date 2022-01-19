# Steps to follow/ Gotchas / Things to keep in mind:

### For running it locally and testing:
```
export PYTHONPATH="/Users/prameshbajracharya/lecodage/personalworks/serverless-works/yt-bazra-download"
```

### Deployment:

**To deploy the UI :**

```shell
serverless client deploy
```

**To deploy the APIs :**
```shell
# For the first time ...
serverless deploy

# Other time (use this from now on ) ...
serverless deploy function -f <functionName>
```

**To deploy python packages :**

A plugin for serverless named (serverless-python-requirements) is used. 
Read here - https://www.serverless.com/blog/serverless-python-packaging