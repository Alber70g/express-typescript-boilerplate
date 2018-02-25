import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec';
import * as passport from 'passport';
import * as OAuth1Strategy from 'passport-oauth1';
import * as session from 'express-session';


export const passportLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    passport.use(new OAuth1Strategy({
        requestTokenURL: 'https://chpp.hattrick.org/oauth/request_token.ashx',
        accessTokenURL: 'https://chpp.hattrick.org/oauth/access_token.ashx',
        userAuthorizationURL: 'https://chpp.hattrick.org/oauth/authorize.aspx',
        consumerKey: 'W6spzhtiVt44sAxSzw515B',
        consumerSecret: 'nGdPsJNWGVrSCqiu2z9GYRIMGeRhd16Edi6XL6snvdM',
        callbackURL: 'http://127.0.0.1:3000/api/auth/example/callback',
        signatureMethod: 'HMAC-SHA1',
    },
        (token, tokenSecret, profile, cb) => {
            console.log('function', token, tokenSecret, profile);
            cb(undefined, {
                token,
                tokenSecret,
                profile,
            });
            // spjwBmDWGTutkDlg V2W77puCnYDYX4eQ
        }
    ));

    passport.serializeUser((user, done) => {
        console.log('serializeUser', user);
        done(undefined, user);
    });

    passport.deserializeUser((user, done) => {
        console.log('deserializeUser', user);
        done(undefined, user);
    });

    const app = settings.getData('express_app');
    app.use(session({
        secret: 'bubu-00001',
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/api/auth/example', passport.authenticate('oauth'));

    app.get('/api/auth/example/callback',
        passport.authenticate('oauth', { failureRedirect: '/login' }),
        (req, res) => {
            // Successful authentication, redirect home.
            console.log('authenticate');
            res.redirect('/api/sync/players');
        });

};
