const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const getMessage = require("./controllers/chat.js");

const app = express();

// Use GCR's PORT or fallback to 8080
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());


app.use(cors());

app.post("/api/chat", getMessage);

// Simple health check route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Updated listen configuration
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});