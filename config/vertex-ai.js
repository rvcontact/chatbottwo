// vertex-ai.js
const { PredictionServiceClient } = require('@google-cloud/aiplatform').v1;
const { helpers } = require('@google-cloud/aiplatform');
const dotenv = require('dotenv');
dotenv.config();

const { endpointPath } = helpers;

const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};

const client = new PredictionServiceClient(clientOptions);

module.exports = client;
