const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('todo_error', "Todavia no tienes acceso. Inicia sesión para acceder")
    res.redirect('/auth/signin')
}

module.exports = isAuthenticated