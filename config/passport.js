const passport = require('passport')
const { Strategy } = require('passport-local').Strategy
const Auth = require('../models/auth')

passport.use(
    new Strategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {

            const user = await Auth.findOne({ email: email })

            if( !user ) {
                return done(null, false, { message: 'Usuario no encontrado'})
            }

            const isMatch = await user.checkPassword(password)
            if ( !isMatch ) {
                return done(null, false, { message: 'Incorrect'})
            }

            return done(null, user)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Auth.findById(id, (err, user) => {
        done(err, user)
    })
})