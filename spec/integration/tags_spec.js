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
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;

          Tag.create({
              name: "cool",
              color: "blue",
              postId: this.post.id
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

})
