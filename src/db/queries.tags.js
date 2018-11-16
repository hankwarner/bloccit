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
    },

    deleteTag(id, callback){
      return Tag.destroy({
        where: { id }
      })
      .then((deletedRecordsCount) => {
        callback(null, deletedRecordsCount);
      })
      .catch((err) => {
        callback(err);
      })
    },

    updateTag(id, updatedTag, callback){
      return Tag.findById(id)
      .then((tag) => {
        if(!tag){
          return callback("Tag not found");
        }
 
        tag.update(updatedTag, {
          fields: Object.keys(updatedTag)
        })
        .then(() => {
          callback(null, tag);
        })
        .catch((err) => {
          callback(err);
        })
      })
    }
}