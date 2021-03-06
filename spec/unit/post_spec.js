const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;
const Vote = require("../../src/db/models").Vote;

describe("Post", () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;
    this.vote;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;

        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
        })
        .then((topic) => {
          this.topic = topic;

          Post.create({
            title: "Lorem Ipsum",
            body: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
            topicId: this.topic.id,
            userId: this.user.id,
            votes: [{
              value: 1,
              userId: this.user.id
            }]
          }, {
            include: {
              model: Vote,
              as: "votes"
            } 
          })
          .then((post) => {
            this.post = post;
            this.vote = this.post.votes[0];
            done();
          })
        })
      })
    })
  })

  describe("#create()", () => {
    it("should create a post object with a title, body, and assigned topic and user", (done) => {
      Post.create({
        title: "Pros of Cryosleep during the long journey",
        body: "1. Not having to answer the 'are we there yet?' question.",
        topicId: this.topic.id,
        userId: this.user.id
      })
      .then((post) => {
        expect(post.title).toBe("Pros of Cryosleep during the long journey");
        expect(post.body).toBe("1. Not having to answer the 'are we there yet?' question.");
        expect(post.topicId).toBe(this.topic.id);
        expect(post.userId).toBe(this.user.id);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })

    it("should not create a post with missing title, body, or assigned post", (done) => {
        Post.create({
          title: "Pros of Cryosleep during the long journey"
        })
        .then((post) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Post.body cannot be null");
          expect(err.message).toContain("Post.topicId cannot be null");
          done();
        })
    })
  })

  describe("#setTopic()", () => {
    it("should associate a topic and a post together", (done) => {
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newTopic) => {
        expect(this.post.topicId).toBe(this.topic.id);
        this.post.setTopic(newTopic)
        .then((post) => {
          expect(post.topicId).toBe(newTopic.id);
          done();
        })
      })
    })
  })

  describe("#getTopic()", () => {
    it("should return the associated topic", (done) => {
      this.post.getTopic()
      .then((associatedTopic) => {
        expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
        done();
      })
    })
  })

  describe("#setUser()", () => {
    it("should associate a post and a user together", (done) => {
      User.create({
        email: "ada@example.com",
        password: "password"
      })
      .then((newUser) => {
        expect(this.post.userId).toBe(this.user.id);
        this.post.setUser(newUser)
        .then((post) => {
          expect(this.post.userId).toBe(newUser.id);
          done();
        })
      })
    })
  })

  describe("#getUser()", () => {
    it("should return the associated topic", (done) => {
      this.post.getUser()
      .then((associatedUser) => {
        expect(associatedUser.email).toBe("starman@tesla.com");
        done();
      })
    })
  })

  describe("#getPoints()", () => {
    it("should return the vote total for a post", (done) => {
      expect(this.post.getPoints()).toBe(1);
      done();
    })
  })

})
