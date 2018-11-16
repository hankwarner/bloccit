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
            if(err){
                res.redirect(500, "/tags/new");
            } else {
                res.redirect(303, `/topics/${req.params.topicId}/posts/${newTag.postId}`);
            }
        })
    },

    show(req, res, next){
        tagQueries.getTag(req.params.id, (err, post) => {
          if(err || tag == null){
            res.redirect(404, "/");
          } else {
            res.render("tags/show", {tag});
          }
        })
    }
}