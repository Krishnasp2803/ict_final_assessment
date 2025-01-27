const express = require("express");
const Post = require("../model");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Server Error");
  }
});


router.post("/", async (req, res) => {
  const { title, content, img_url } = req.body;

  try {
    const newPost = new Post({ title, content, img_url });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Server Error");
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    res.status(204).send(); 
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Server Error");
  }
});

// UPDATE a post
router.put("/:id", async (req, res) => {
  const { title, content, img_url } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, img_url },
      { new: true } 
    );
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;