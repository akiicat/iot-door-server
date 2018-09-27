# Gcloud Deploy

## Set gcloud project

```shell
gcloud set config
```

## Set Environment Variable

```shell
cp app.example.yaml app.yaml
cat app.yaml
```

```shell
PUBSUB_TOPIC: YOUR_PUBSUB_TOPIC
PUBSUB_VERIFICATION_TOKEN: YOUR_RANDOM_TOEKN
```

## Deploy

```shell
gcloud app deploy
```
