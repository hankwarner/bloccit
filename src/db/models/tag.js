'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Tag.associate = function(models) {
    Tag.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    })
  }
  return Tag;
}