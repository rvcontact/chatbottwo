const { client, endpointName } = require('./vertex-ai');

async function testPrediction() {
  try {
    const instances = [{ content: 'Hello' }];
    const parameters = {
      temperature: 0.5,
      maxOutputTokens: 256,
      topP: 0.8,
      topK: 40,
    };
    const request = {
      endpoint: endpointName,
      instances,
      parameters,
    };
    const [response] = await client.predict(request);
    console.log('Prediction response:', response);
  } catch (error) {
    console.error('Error during test prediction:', error.message, error.stack);
  }
}

testPrediction();
