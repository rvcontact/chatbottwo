// controllers/chat.js
const client = require('../vertex-ai');
const { endpointPath } = require('@google-cloud/aiplatform').helpers;

const getMessage = async (req, res) => {
  try {
    const messages = req.body.messages || [];
    const lastMessage = messages[messages.length - 1];

    const project = process.env.PROJECT_ID;
    const location = 'us-central1'; // Update if necessary
    const endpointId = process.env.ENDPOINT_ID;

    const endpoint = endpointPath(project, location, endpointId);

    const instances = [
      {
        content: lastMessage.content,
      },
    ];

    const parameters = {
      temperature: 0.5,
      maxOutputTokens: 256,
      topP: 0.8,
      topK: 40,
    };

    const request = {
      endpoint,
      instances,
      parameters,
    };

    const [response] = await client.predict(request);

    const predictions = response.predictions;
    const reply = predictions[0].content;

    res.json({ reply });
  } catch (error) {
    console.error('Error during Vertex AI prediction:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};

module.exports = getMessage;
