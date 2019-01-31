const { User } = require("unleash-server")
const auth = require("basic-auth")

module.exports = function basicAuthentication(app) {
  app.use('/api/admin/', (req, res, next) => {
    const credentials = auth(req);

    if (
      !credentials ||
      credentials.name !== "admin" ||
      credentials.pass !== process.env.PASSWORD
    ) {
      res.statusCode = 401
      res.setHeader("WWW-Authenticate", 'Basic realm="Private"')
      res.end("Access denied")
    } else {
      const user = new User({ email: `${credentials.name}@ignusdigital.com` });
      req.user = user;
      next()
    }
  });
}
