const Tag = require("./models").Tag;
const Post = require("./models").Post;
const Topic = require("./models").Topic;

module.exports = {
    addTag(newTag, callback){
        return Tag.create(newTag)
        .then((tag) => {
          callback(null, tag);
        })
        .catch((err) => {
          callback(err);
        })
    }
}