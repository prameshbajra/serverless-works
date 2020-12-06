# Steps to follow/ Gotchas / Things to keep in mind:

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