const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = app => {
    const MONGO_URI =  process.env.DB_REMOTE || process.env.MONGODB_URI || "mongodb://localhost/server";
    // app.set('trust proxy', 1) // trust first proxy for production, when secure: true 
    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true,
            saveUninitialized: false,
            // name: 'MateCuMateiCookie', // This needs to be unique per-host.
            cookie: {
				sameSite: process.env.NODE_ENV === 'production' ? false : '',
				secure: process.env.NODE_ENV === 'production' ? 'auto' : false, //Some web browsers require that the Secure attribute be set to true when the SameSite attribute has been set to 'none'
				httpOnly: false, 
                maxAge: 600000,
                path:'/',
                // domain: 'herokuapp.com',
                // domain: 'matecumatei.com',
                // domain: 'railway.app',

            },
            store: MongoStore.create({
                // mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/basicAuth'
                mongoUrl: MONGO_URI || 'mongodb://localhost/basicAuth'
            })
        })
    );
};