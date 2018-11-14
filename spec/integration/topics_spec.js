const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts/";
const sequelize = require("../../src/db/models/index").sequelize;
const post = require("../../src/db/models").post;

describe("routes : posts", () => {
    beforeEach((done) => {
        this.post;
        sequelize.sync({force: true}).then((res) => {
  
         post.create({
           title: "JS Frameworks",
           description: "There is a lot of them"
         })
          .then((post) => {
            this.post = post;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
    });

  describe("GET /posts", () => {
    it("should return a status code 200 and all posts", (done) => {
        request.get(base, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(body).toContain("posts");
            expect(body).toContain("JS Frameworks");
            done();
        })
    })
  })

  describe("GET /posts/new", () => {
    it("should render a new post form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New post");
        done();
      })
    })
  })

  describe("POST /posts/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "blink-182 songs",
        description: "What's your favorite blink-182 song?"
      }
    }

    it("should create a new post and redirect", (done) => {
      request.post(options, (err, res, body) => {
        post.findOne({where: {title: "blink-182 songs"}})
        .then((post) => {
          expect(res.statusCode).toBe(303);
          expect(post.title).toBe("blink-182 songs");
          expect(post.description).toBe("What's your favorite blink-182 song?");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })
    })
  })

  describe("GET /posts/:id", () => {
    it("should render a view with the selected post", (done) => {
      request.get(`${base}${this.post.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("JS Frameworks");
        done();
      })
    })
  })

  describe("POST /posts/:id/destroy", () => {
    it("should delete the post with the associated ID", (done) => {
      post.all()
      .then((posts) => {
        const postCountBeforeDelete = posts.length;
        expect(postCountBeforeDelete).toBe(1);
        request.post(`${base}${this.post.id}/destroy`, (err, res, body) => {
          post.all()
          .then((posts) => {
            expect(err).toBeNull();
            expect(posts.length).toBe(postCountBeforeDelete - 1);
            done();
          })
        })
      })
    })
  })

  describe("GET /posts/:id/edit", () => {
    it("should render a view with an edit post form", (done) => {
      request.get(`${base}${this.post.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit post");
        expect(body).toContain("JS Frameworks");
        done();
      })
    })
  })

  describe("POST /posts/:id/update", () => {
    it("should update the post with the given values", (done) => {
       const options = {
          url: `${base}${this.post.id}/update`,
          form: {
            title: "JavaScript Frameworks",
            description: "There are a lot of them"
          }
        }
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();
          post.findOne({
            where: { id: this.post.id }
          })
          .then((post) => {
            expect(post.title).toBe("JavaScript Frameworks");
            done();
          })
        })
    })
  })

})
