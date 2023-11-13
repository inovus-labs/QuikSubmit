
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { nanoid } = require('nanoid');
const User = require('../models/Users');


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ['profile', 'email']
    }, async (accessToken, refreshToken, profile, done) => {
        
        console.log(profile);
        
        const newUser = {
            user_id: nanoid(),
            provider: profile.provider,
            provider_id: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            verified: profile.emails[0].verified
        }

        try {
            let user = await User.findOne({ email: profile.emails[0].value });

            if(user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch(err) {
            console.error(err);
        }
    })
);



passport.serializeUser((user, done) => {
    console.log("--- passport.serializeUser() ---");
    done(null, user);
});



passport.deserializeUser((user, done) => {
    console.log("--- passport.deserializeUser() ---");
    done(null, user);
    // User.findById(id, (err, user) => done(err, user));
});


