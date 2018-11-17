const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Tag = require("../../src/db/models").Tag;

describe("Tag", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.tag;
    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          Tag.create({
              name: "lame",
              color: "green",
              postId: this.post.id
          })
          .then((tag) => {
              this.tag = tag;
              done();
          })
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
  })

  describe("#create()", () => {
    it("should create a tag object with a name, color, and assigned post", (done) => {
      Tag.create({
        name: "creative",
        color: "orange",
        postId: this.post.id,
        topicId: this.post.topicId
      })
      .then((tag) => {
        expect(tag.name).toBe("creative");
        expect(tag.color).toBe("orange");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })

    it("should not create a tag with missing name, color, or assigned post", (done) => {
        Tag.create({
          name: "offensive"
        })
        .then((tag) => {
          done()
        })
        .catch((err) => {
          expect(err.message).toContain("Tag.color cannot be null");
          expect(err.message).toContain("Tag.postId cannot be null");
          done();
        })
    })
  })

  describe("#setPost()", () => {
    it("should associate a post and a tag together", (done) => {
      Post.create({
        title: "Hiya buddy",
        body: "How's the weather up there?",
        topicId: this.topic.id
      })
      .then((newPost) => {
        expect(this.tag.postId).toBe(this.post.id);
        this.tag.setPost(newPost)
        .then((tag) => {
          expect(tag.postId).toBe(newPost.id);
          done();
        })
      })
    })
  })

  describe("#getPost()", () => {
    it("should return the associated post", (done) => {
      this.tag.getPost()
      .then((associatedPost) => {
        expect(associatedPost.title).toBe("My first visit to Proxima Centauri b");
        done();
      })
    })
  })

})
