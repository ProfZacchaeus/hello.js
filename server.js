const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Bonus: Custom middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static HTML page
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.send('My Week 2 API!');
});

app.post('/user', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  res.send(`Hello, ${name}!`);
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.send(`User ${id} profile`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
