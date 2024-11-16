# Chatbot Test Suite Guide

## Prerequisites
1. Node.js installed (v14 or higher)
2. VS Code installed
3. Access to the deployed Cloud Run service
4. Required npm packages installed

## Setup

1. Create a new directory for tests:
```bash
mkdir tests
cd tests
```

2. Install required dependencies:
```bash
npm install axios jest node-fetch https
```

3. Create a `.env` file in the tests directory:
```env
SERVICE_URL=https://gemini-chatbot-service-551924449204.us-central1.run.app
NODE_ENV=test
```

## Running Tests

### 1. Individual Test Files

To run specific test files:

```bash
# Backend API Test
node tests/backend-test.js

# Session Test
node tests/session-test.js

# CORS Test
node tests/cors-test.js

# Load Test
node tests/load-test.js

# Vertex AI Test
node tests/vertex-ai-test.js
```

### 2. Complete Test Suite

To run all tests:
```bash
node tests/run-all-tests.js
```

## Test Descriptions

1. **Backend API Test**
   - Tests basic API functionality
   - Verifies endpoint responses
   - Checks response formats

2. **Session Test**
   - Verifies session creation
   - Tests session persistence
   - Checks session security

3. **CORS Test**
   - Validates CORS headers
   - Tests allowed origins
   - Verifies HTTP methods

4. **Load Test**
   - Tests concurrent requests
   - Measures response times
   - Checks system stability

5. **Vertex AI Test**
   - Validates AI responses
   - Tests different query types
   - Checks response quality

## Interpreting Results

- ✅ Green checkmark: Test passed
- ❌ Red X: Test failed
- Response times are shown in milliseconds
- Detailed error messages for failed tests
- Summary statistics at the end

## Troubleshooting

1. If tests fail due to connection issues:
   ```bash
   # Check service status
   curl https://gemini-chatbot-service-551924449204.us-central1.run.app
   ```

2. For CORS errors:
   - Verify allowed origins in server configuration
   - Check browser console for detailed error messages

3. For authentication errors:
   - Verify environment variables
   - Check service account permissions

4. For timeout errors:
   - Increase timeout in test configuration
   - Check service availability

## VS Code Integration

1. Install "Jest Runner" extension in VS Code
2. Add to `.vscode/settings.json`:
```json
{
  "jest.autoRun": "off",
  "jest.testExplorer": {
    "enabled": true
  }
}
```

3. Use VS Code's testing sidebar to run tests

## Continuous Integration

Add to your GitHub Actions workflow:
```yaml
- name: Run Tests
  run: |
    cd tests
    npm install
    node run-all-tests.js
```