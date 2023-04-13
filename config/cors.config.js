const cors = require('cors')
const whitelist = [process.env.DOMAIN_LOCAL, process.env.REACT_APP_BASE_URL, process.env.NETLIFY_BASE_URL, process.env.DOMAIN_REMOTE, process.env.NAMECHEAP_BASE_URL, process.env.RAILWAY_BASE_URL, ]

const corsOptions = {
    origin: (origin, cb) => {
        const originIsWhitelisted = whitelist.includes(origin)
        cb(null, originIsWhitelisted)
    },
    credentials: true,
    // exposedHeaders: 'set-cookie', // add this line
}

module.exports = (app) => {
  app.use(cors( corsOptions ))

};
