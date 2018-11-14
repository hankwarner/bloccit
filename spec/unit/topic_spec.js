const sequelize = require("../../src/db/models/index").sequelize;
const post = require("../../src/db/models").post;
const Post = require("../../src/db/models").Post;

describe('post', () => {
    
    beforeEach((done) => {
        this.post;
        sequelize.sync({force: true}).then((res) => {
    
          post.create({
            title: "Best coffee in Atlanta",
            description: "Where to get coffee in Atlanta."
          })
          .then((post) => {
            this.post = post;

            Post.create({
                title: "I'm new here",
                body: "Where are the best places in the city to get coffee?",
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

    describe('#create()', () => {
        it('should create a post object with a title, description, and post Id', (done) => {
            expect(this.post.title).toContain("Best coffee in Atlanta");
            expect(this.post.description).toContain("Where to get coffee in Atlanta.");
            done();
        })  
    })

    describe('#getPosts()', () => {
        it('should return all posts with the post in scope', (done) => {
            this.post.getPosts()
            .then((associatedPosts) => {
                expect(associatedPosts[0].title).toBe("I'm new here");
                expect(associatedPosts[0].postId).toBe(this.post.id);
                done();
            })
        })
    })
})
