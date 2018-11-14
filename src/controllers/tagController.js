const tagQueries = require("../db/queries.tags.js");

module.exports = {
    new(req, res, next){
        res.render("tags/new", {
            topicId: req.params.topicId,
            postId: req.params.postId
        })
    },

    create(req, res, next){
        let newTag = {
          name: req.body.name,
          color: req.body.color,
          postId: req.params.postId
        };
        tagQueries.addTag(newTag, (err, post) => {
            console.log(req.params.topicId);
            if(err){
                res.redirect(500, "/tags/new");
            } else {
                res.redirect(303, `/topics/${req.params.topicId}/posts/${newTag.postid}`);
            }
        });
    }
}