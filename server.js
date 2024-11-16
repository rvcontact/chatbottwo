const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const getMessage = require("./controllers/chat.js");

const app = express();

// Use Render's PORT or fallback to 5000
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY || "default_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

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