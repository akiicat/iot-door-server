const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Buffer = require('safe-buffer').Buffer;
const process = require('process'); // Required for mocking environment variables

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const PubSub = require('@google-cloud/pubsub');

// Instantiate a pubsub client
const pubsub = PubSub();

const app = express();
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

const formBodyParser = bodyParser.urlencoded({extended: false});
const jsonBodyParser = bodyParser.json();

// List of all messages received by this instance
const messages = [];

// The following environment variables are set by app.yaml when running on GAE,
// but will need to be manually set when running locally.
const PUBSUB_VERIFICATION_TOKEN = process.env.PUBSUB_VERIFICATION_TOKEN;

const topic = pubsub.topic(process.env.PUBSUB_TOPIC);
const publisher = topic.publisher();

// [START]
app.post('/pubsub/push', jsonBodyParser, (req, res) => {
  if (req.query.token !== PUBSUB_VERIFICATION_TOKEN) {
    res.status(400).json({status: 400, message: 'token invalid'});
    return;
  }

  publisher.publish(Buffer.from(JSON.stringify(req.body)), err => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).json({status: 200});
  });
});
// [END]

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
