const express = require('express');
const mongoose = require('mongoose');
const Post = require('./model'); // Import your Post model
const cors = require('cors');  // Import CORS package
const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();

// Middleware
app.use(cors());  // Enable CORS for all origins (you can restrict this if needed)
app.use(express.json()); // For parsing application/json

// Connect to MongoDB (assumes you have the connection set up)
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// API Routes

// GET all posts
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// POST a new post
app.post('/posts', async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
});

// DELETE a post
app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// UPDATE a post
app.put('/posts/:id', async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPost);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});