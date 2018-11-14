const sequelize = require("../../src/db/models/index").sequelize;
const post = require("../../src/db/models").post;
const Post = require("../../src/db/models").Post;

describe("Post", () => {

  beforeEach((done) => {
    this.post;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      post.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((post) => {
        this.post = post;

        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          postId: this.post.id
        })
        .then((post) => {
          this.post = post;
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
  })

  describe("#create()", () => {
    it("should create a post object with a title, body, and assigned post", (done) => {
      Post.create({
        title: "Pros of Cryosleep during the long journey",
        body: "1. Not having to answer the 'are we there yet?' question.",
        postId: this.post.id
      })
      .then((post) => {
        expect(post.title).toBe("Pros of Cryosleep during the long journey");
        expect(post.body).toBe("1. Not having to answer the 'are we there yet?' question.");
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
          expect(err.message).toContain("Post.postId cannot be null");
          done();
        })
    })
  })

  describe("#setpost()", () => {
    it("should associate a post and a post together", (done) => {
      post.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newpost) => {
        expect(this.post.postId).toBe(this.post.id);
        this.post.setpost(newpost)
        .then((post) => {
          expect(post.postId).toBe(newpost.id);
          done();
        })
      })
    })
  })

  describe("#getpost()", () => {
    it("should return the associated post", (done) => {
      this.post.getpost()
      .then((associatedpost) => {
        expect(associatedpost.title).toBe("Expeditions to Alpha Centauri");
        done();
      })
    })
  })

})
