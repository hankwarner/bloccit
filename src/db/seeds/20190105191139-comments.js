'use strict';

const faker = require("faker");

let comments = [];

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 1,
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
    postId: 3,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 4,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 5,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 6,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 7,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 8,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 1 ; i <= 5 ; i++){
  comments.push({
    body: faker.lorem.words(),
    postId: 9,
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
