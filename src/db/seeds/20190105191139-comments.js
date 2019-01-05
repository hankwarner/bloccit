'use strict';

const faker = require("faker");

let comments = [];

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 2,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 2,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 2,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 2,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", comments, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  }
};
