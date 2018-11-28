'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });

    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });

    Post.prototype.getPoints = function(){
      console.log(this.post.votes);
      if(this.votes.length === 0) return 0
      return this.votes
        .map((v) => { return v.value })
        .reduce((prev, next) => { return prev + next });
    }
//call this method on a Post object with userId as an argument. 
//It returns true if the user with the matching userId has an upvote for the post. 
    Post.prototype.hasUpvoteFor = function(userId){
      //this.votes.filter by userId...if length > 1

    }
  }
  return Post;
}
