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

// Define your project ID, location, and endpoint ID
const projectId = process.env.PROJECT_ID || 'your-project-id'; // Replace 'your-project-id' with your actual project ID
const location = 'us-central1'; // Ensure this matches your endpoint's location
const endpointId = '147796353005649920';

// Construct the full endpoint resource name
const endpointName = client.endpointPath(projectId, location, endpointId);

// Export the client and endpointName
module.exports = {
  client,
  endpointName,
};
