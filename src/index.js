
const unleash = require("unleash-server")
const cors = require('cors')
const dotenv = require("dotenv")
const basicAuthentication = require("./basicAuth")

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

unleash
  .start({
    preHook: app => app.use(cors()),
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT,
    secret: process.env.SECRET,
    adminAuthentication: 'custom',
    preRouterHook: basicAuthentication,
  })


