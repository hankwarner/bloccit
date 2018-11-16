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
    },

    getTag(id, callback){
      return Tag.findById(id)
      .then((tag) => {
        callback(null, tag);
      })
      .catch((err) => {
        callback(err);
      })
    }
}