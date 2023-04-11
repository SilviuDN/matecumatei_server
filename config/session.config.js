const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = app => {
    const MONGO_URI =  process.env.DB_REMOTE || process.env.MONGODB_URI || "mongodb://localhost/server";
    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                sameSite: 'none',
                httpOnly: true,
                maxAge: 6000000,
            },
            store: MongoStore.create({
                // mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/basicAuth'
                mongoUrl: MONGO_URI || 'mongodb://localhost/basicAuth'
            })
        })
    );
};