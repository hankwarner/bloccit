const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe('Topic', () => {
    
    beforeEach((done) => {
        this.topic;
        sequelize.sync({force: true}).then((res) => {
    
          Topic.create({
            title: "Best coffee in Atlanta",
            description: "Where to get coffee in Atlanta."
          })
          .then((topic) => {
            this.topic = topic;

            Post.create({
                title: "I'm new here",
                body: "Where are the best places in the city to get coffee?",
                topicId: this.topic.id
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
        it('should create a topic object with a title, description, and topic Id', (done) => {
            expect(this.topic.title).toContain("Best coffee in Atlanta");
            expect(this.topic.description).toContain("Where to get coffee in Atlanta.");
            done();
        })  
    })

    describe('#getPosts()', () => {
        it('should return all posts with the topic in scope', (done) => {
            this.topic.getPosts()
            .then((associatedPosts) => {
                expect(associatedPosts[0].title).toBe("I'm new here");
                expect(associatedPosts[0].topicId).toBe(this.topic.id);
                done();
            })
        })
    })
})
