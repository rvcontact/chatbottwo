// vertex-ai.js
const { PredictionServiceClient } = require('@google-cloud/aiplatform');

// Create a new client instance
const client = new PredictionServiceClient();

// Retrieve environment variables
const projectId = process.env.PROJECT_ID;
const location = 'us-central1';
const endpointId = process.env.ENDPOINT_ID;

// Manually construct the endpoint name
const endpointName = `projects/${projectId}/locations/${location}/endpoints/${endpointId}`;

// Export the client and the endpoint name
module.exports = {
  client,
  endpointName,
};
