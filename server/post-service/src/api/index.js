module.exports = {
    PostController: require('./controllers/post'),
    verifyToken: require('./middlewares/auth'),
    CategoryController: require('./controllers/category'),
    appEvent: require('./app-event'),
}
