const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Tag = require("../../src/db/models").Tag;

describe("routes : tags", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.tag;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Winter Games",
        description: "Post your Winter Games stories."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Snowball Fighting",
          body: "So much snow!",
          topicId: this.topic.id,
          userId: this.user.id
        })
        .then((post) => {
          this.post = post;

          Tag.create({
              name: "cool",
              color: "blue",
              postId: this.post.id,
              topicId: this.post.topicId
          })
          .then((tag) => {
              this.tag = tag;
              done();
          })
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })
    })
  })

  describe("GET /topics/:topicId/posts/:postId/tags/new", () => {
    it("should render a new tag form", (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}/tags/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Tag");
        done();
      })
    })
  })

  describe("POST /topics/:topicId/posts/:postId/create", () => {
    it("should create a new tag and redirect", (done) => {
       const options = {
         url: `${base}/${this.topic.id}/posts/${this.post.id}/create`,
         form: {
           name: "cool",
           color: "blue",
           postId: this.post.id,
           topicId: this.post.topicId
         }
       };
       request.post(options,
         (err, res, body) => {
           Tag.findOne({where: {name: "cool"}})
           .then((tag) => {
             expect(tag).not.toBeNull();
             expect(tag.name).toBe("cool");
             expect(tag.color).toBe("blue");
             expect(tag.postId).not.toBeNull();
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           })
         }
       )
     })
  })

  describe("GET /topics/:topicId/posts/:postId/tags/:id", () => {
    it("should render a view with the selected tag", (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}/tags/${this.tag.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("cool");
        done();
      })
    })
  })

  describe("POST /topics/:topicId/posts/:postId/tags/:id/destroy", () => {
    it("should delete the tag with the associated ID", (done) => {
      expect(this.tag.id).toBe(1);
      request.post(`${base}/${this.topic.id}/posts/${this.post.id}/tags/${this.tag.id}/destroy`, (err, res, body) => {
        Tag.findById(1)
        .then((tag) => {
          expect(err).toBeNull();
          expect(tag).toBeNull();
          done();
        })
      })
    })
  })

  describe("GET /topics/:topicId/posts/:postId/tags/:id/edit", () => {
    it("should render a view with an edit tag form", (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}/tags/${this.tag.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Tag");
        expect(body).toContain("cool");
        done();
      })
    })
  })

})
