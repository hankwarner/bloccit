module.exports = {
    init(app){
        const staticRoutes = require('../routes/static');
        const topicRoutes = require("../routes/topics");
        const postRoutes = require("../routes/posts");
        const tagRoutes = require("../routes/tags");

        app.use(staticRoutes);
        app.use(topicRoutes);
        app.use(postRoutes);
        app.use(tagRoutes);
    }
}