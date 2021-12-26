module.exports = {
    UserController: require('./controllers/user'),
    appEvent: require('./app-event'),
    verifyToken: require('./middlewares/auth')
}
