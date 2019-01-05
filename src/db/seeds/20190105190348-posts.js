'use strict';

const faker = require("faker");

let posts = [];

for(let i = 1 ; i <= 5 ; i++){
  posts.push({
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    topicId: 2,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  posts.push({
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    topicId: 3,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  posts.push({
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    topicId: 4,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  posts.push({
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    topicId: 5,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", posts, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  }
};
