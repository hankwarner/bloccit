const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

router.get("/topics/:topicId/posts/:postId/tags/new", tagController.new);
router.post("/topics/:topicId/posts/:postId/tags/create", tagController.create);

module.exports = router;