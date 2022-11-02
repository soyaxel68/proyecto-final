const express = require('express')
const { showAuthFormSignUp, signup, showAuthFormSignIn, profile, signin, logout } = require('../controllers/auth')
const isAuthenticated = require('../middlewares/isauthenticated')
const routerAuth = express.Router()

// Routes

routerAuth.get("/auth/signup", showAuthFormSignUp)
routerAuth.post("/auth/signup", signup)

routerAuth.get('/auth/signin', showAuthFormSignIn)
routerAuth.post('/auth/signin', signin)

routerAuth.get('/auth/profile', isAuthenticated, profile)

routerAuth.get('/auth/logout', logout)

module.exports = {
    routerAuth
}