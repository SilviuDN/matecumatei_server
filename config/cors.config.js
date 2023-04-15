const cors = require('cors')
const whitelist = [process.env.DOMAIN_LOCAL, process.env.NETLIFY_BASE_URL, process.env.DOMAIN_REMOTE, process.env.HEROKU_BASE_URL , process.env.NAMECHEAP_BASE_URL]

const corsOptions = {
    origin: (origin, cb) => {
      console.log('CORS CORS CORS CORS ',origin)
        const originIsWhitelisted = whitelist.includes(origin)
        cb(null, originIsWhitelisted)
    },
    credentials: true,
    // exposedHeaders: 'set-cookie', // add this line
}

module.exports = (app) => {
  app.use(cors( corsOptions ))

};
