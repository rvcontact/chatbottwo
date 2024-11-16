// test-backend.js
const axios = require('axios');

// Configuration
const config = {
  // Update this URL to match your deployed service or use localhost for local testing
  baseURL: 'https://gemini-chatbot-service-551924449204.us-central1.run.app',
  // Test messages to send
  testMessages: [
    "Hello, how are you?",
    "What is 2 + 2?",
    "Tell me about cloud computing.",
  ]
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

async function testEndpoint(message) {
  console.log(`${colors.blue}Testing message: "${message}"${colors.reset}`);
  
  try {
    const startTime = Date.now();
    
    const response = await axios.post(`${config.baseURL}/api/chat`, {
      messages: [{ content: message }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`${colors.green}✓ Success${colors.reset}`);
    console.log(`${colors.yellow}Response time: ${duration}ms${colors.reset}`);
    console.log(`${colors.blue}Response:${colors.reset}`, response.data);
    console.log('\n');
    
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ Error${colors.reset}`);
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Message: ${JSON.stringify(error.response.data)}`);
    } else {
      console.log(`Error: ${error.message}`);
    }
    console.log('\n');
    
    return false;
  }
}

async function runTests() {
  console.log(`${colors.yellow}Starting backend tests...${colors.reset}\n`);
  
  // Test health check endpoint
  try {
    console.log(`${colors.blue}Testing health check endpoint...${colors.reset}`);
    const healthCheck = await axios.get(`${config.baseURL}/`);
    console.log(`${colors.green}✓ Health check successful${colors.reset}\n`);
  } catch (error) {
    console.log(`${colors.red}✗ Health check failed${colors.reset}`);
    console.log(`Error: ${error.message}\n`);
  }

  // Test chat endpoint with multiple messages
  let successCount = 0;
  for (const message of config.testMessages) {
    const success = await testEndpoint(message);
    if (success) successCount++;
  }

  // Print summary
  console.log(`${colors.yellow}Test Summary:${colors.reset}`);
  console.log(`Total tests: ${config.testMessages.length}`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${config.testMessages.length - successCount}`);
}

// Run the tests
runTests().catch(console.error);