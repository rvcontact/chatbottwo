// vertex-ai.js
const { PredictionServiceClient } = require('@google-cloud/aiplatform');

// Create a new client instance
const client = new PredictionServiceClient();

// Retrieve environment variables
//OLD const projectId = process.env.PROJECT_ID;
//OLD const location = 'us-central1';
//OLD const endpointId = process.env.ENDPOINT_ID;

// Manually construct the endpoint name
//OLD const endpointName = `projects/${projectId}/locations/${location}/endpoints/${endpointId}`;

// In vertex-ai.js
const projectId = process.env.PROJECT_ID;
const location = 'us-east4';
const endpointId = process.env.ENDPOINT_ID;
const endpointName = `projects/${projectId}/locations/${location}/endpoints/${endpointId}`;

// Export the client and the endpoint name
module.exports = {
  client,
  endpointName,
};
