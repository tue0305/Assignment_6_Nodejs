module.exports = {
    CommentController: require('./controllers/comment'),
    appEvent: require('./app-event'),
    verifyToken: require('./middlewares/auth')
}
