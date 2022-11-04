const { response } = require("express");
const passport = require("passport");

const Auth = require("../models/auth");

const showAuthFormSignUp = (req, res = response) => {
    res.render('auth/signup')
}

const signup = async (req, res = response) => {
    const errors = []
    const { name, email, password, confirm_password } = req.body

    if (name.length <= 0){
        errors.push({msg: 'Inserte nombre'})
        
    }

    if ( password !== confirm_password ) {
        errors.push({ msg: 'Las contraseñas no coinciden'})
    }

    if ( password.length < 4 ) {
        errors.push({ msg: 'La contraseña debe tener al menos 4 caracteres'})
    }

    if ( errors.length > 0) {
        return res.render('auth/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        })

  /*       const { name, email, password, confirm_password } = req.body;
        const errors = []
        if (name.length <= 0){
            errors.push({text: 'Inserte nombre'})
        }
        if (password != confirm_password) {
            errors.push({text: "Las contraseñas no coinciden"})
        }
        if (password.length > 4) {
            errors.push({text: "La contraseña debe tener al menos 4 caracteres"})
        }
        if (errors.length > 0) {
            res.send('/auth/signup', errors, name, email, password, confirm_password)
        }else {
            res.send("Todo bien")
        }
        res.send("ok") */
    }

    const userFound = await Auth.findOne({ email })
    if ( userFound ) {
        req.flash('todo_error', "Email ya existente en nuestros registros")
        return res.redirect('/auth/signup')
    }

    const newUser = new Auth({ name, email, password })
    newUser.password = await newUser.passwordEncrypt(password)
    await newUser.save()
    req.flash("todo_ok", "Se registró correctamente")
    res.redirect('/auth/signin')
}

const showAuthFormSignIn = (req, res = response) => {
    res.render('auth/signin')
}

const signin = passport.authenticate('local', {
    successRedirect: "/posts",
    failureRedirect: '/auth/signin',
    failureFlash: true,
})

const profile = (req, res = response) => {
    const {name, email}= req.user
    res.json({name, email})
}


const logout = async (req, res = response, next) => {
    await req.logout((err) => {
        if( err ) return next()
        res.redirect('/auth/signin')
    })
}

module.exports = {
    showAuthFormSignUp,
    signup,
    showAuthFormSignIn,
    signin,
    logout,
    profile
}