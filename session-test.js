// tests/session-test.js
const axios = require('axios');
const https = require('https');

const testSession = async () => {
  const agent = new https.Agent({
    rejectUnauthorized: false // Note: Only for testing
  });

  const client = axios.create({
    baseURL: 'https://gemini-chatbot-service-551924449204.us-central1.run.app',
    withCredentials: true,
    httpsAgent: agent
  });

  try {
    // Test session creation
    const response = await client.post('/api/session', {});
    console.log('Session created:', response.data);
    
    // Test session persistence
    const sessionCheck = await client.get('/api/session');
    console.log('Session verified:', sessionCheck.data);
    
    return true;
  } catch (error) {
    console.error('Session test failed:', error.message);
    return false;
  }
};

// tests/cors-test.js
const testCORS = async () => {
  try {
    const response = await fetch('https://gemini-chatbot-service-551924449204.us-central1.run.app/api/chat', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000'
      }
    });
    
    const headers = response.headers;
    console.log('CORS Headers:', {
      'access-control-allow-origin': headers.get('access-control-allow-origin'),
      'access-control-allow-methods': headers.get('access-control-allow-methods'),
      'access-control-allow-headers': headers.get('access-control-allow-headers')
    });
    
    return response.ok;
  } catch (error) {
    console.error('CORS test failed:', error.message);
    return false;
  }
};

// tests/load-test.js
const loadTest = async (requests = 10, concurrency = 3) => {
  const message = "Hello, this is a test message";
  const results = {
    successful: 0,
    failed: 0,
    avgResponseTime: 0
  };
  
  const sendRequest = async () => {
    const start = Date.now();
    try {
      await axios.post('https://gemini-chatbot-service-551924449204.us-central1.run.app/api/chat', {
        messages: [{ content: message }]
      });
      results.successful++;
      return Date.now() - start;
    } catch (error) {
      results.failed++;
      return null;
    }
  };

  const times = [];
  for (let i = 0; i < requests; i += concurrency) {
    const batch = Array(Math.min(concurrency, requests - i)).fill().map(sendRequest);
    const batchTimes = await Promise.all(batch);
    times.push(...batchTimes.filter(t => t !== null));
  }
  
  results.avgResponseTime = times.reduce((a, b) => a + b, 0) / times.length;
  return results;
};

// tests/vertex-ai-test.js
const testVertexAI = async () => {
  const testCases = [
    {
      input: "What is 2+2?",
      expectedType: "number"
    },
    {
      input: "Tell me a short story",
      expectedType: "string",
      minLength: 50
    },
    {
      input: "What's the weather like?",
      expectedContextual: true
    }
  ];

  const results = {
    passed: 0,
    failed: 0,
    details: []
  };

  for (const test of testCases) {
    try {
      const response = await axios.post('https://gemini-chatbot-service-551924449204.us-central1.run.app/api/chat', {
        messages: [{ content: test.input }]
      });
      
      const result = {
        input: test.input,
        output: response.data.reply,
        passed: true,
        reason: 'Success'
      };

      if (test.expectedType && typeof response.data.reply !== test.expectedType) {
        result.passed = false;
        result.reason = `Expected type ${test.expectedType}, got ${typeof response.data.reply}`;
      }

      if (test.minLength && response.data.reply.length < test.minLength) {
        result.passed = false;
        result.reason = `Response too short. Expected >= ${test.minLength}, got ${response.data.reply.length}`;
      }

      result.passed ? results.passed++ : results.failed++;
      results.details.push(result);
    } catch (error) {
      results.failed++;
      results.details.push({
        input: test.input,
        passed: false,
        reason: error.message
      });
    }
  }

  return results;
};

// tests/run-all-tests.js
const runAllTests = async () => {
  console.log('🚀 Starting comprehensive test suite...\n');

  console.log('1️⃣ Testing Backend API...');
  const backendTest = require('./backend-test');
  await backendTest();

  console.log('\n2️⃣ Testing Sessions...');
  const sessionResults = await testSession();
  console.log(`Session test ${sessionResults ? 'passed ✅' : 'failed ❌'}`);

  console.log('\n3️⃣ Testing CORS...');
  const corsResults = await testCORS();
  console.log(`CORS test ${corsResults ? 'passed ✅' : 'failed ❌'}`);

  console.log('\n4️⃣ Running Load Test...');
  const loadResults = await loadTest();
  console.log('Load Test Results:', loadResults);

  console.log('\n5️⃣ Testing Vertex AI Integration...');
  const vertexResults = await testVertexAI();
  console.log('Vertex AI Test Results:', vertexResults);

  console.log('\n📊 Test Suite Complete!');
};

module.exports = {
  testSession,
  testCORS,
  loadTest,
  testVertexAI,
  runAllTests
};