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
        tagQueries.getTag(req.params.id, (err, tag) => {
            if(err || tag == null){
            res.redirect(404, "/");
          } else {
            res.render("tags/show", {tag});
          }
        })
    },

    destroy(req, res, next){
        tagQueries.deleteTag(req.params.id, (err, deletedRecordsCount) => {
            if(err){
            res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
          } else {
            res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
          }
        });
    },

    edit(req, res, next){
        tagQueries.getTag(req.params.id, (err, tag) => {
            if(err || tag == null){
            res.redirect(404, "/");
          } else {
            res.render("tags/edit", {tag});
          }
        });
    }
}