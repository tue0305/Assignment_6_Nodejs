module.exports = {
    UserController: require('./controllers/user'),
    appEvents: require('./app_event'),
    verifyToken: require('./middlewares/auth')
}
