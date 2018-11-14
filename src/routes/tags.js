const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

router.get("/topics/:topicId/posts/:postId/tags/new", tagController.new);

module.exports = router;