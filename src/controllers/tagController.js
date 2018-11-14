const tagQueries = require("../db/queries.tags.js");

module.exports = {
    new(req, res, next){
        res.render("tags/new", {postId: req.params.postId});
    }
}