const jwt = require('express-jwt'); // npm install express-jwt
const jwksRsa = require('jwks-rsa'); //npm install --save jwks-rsa
const config = require('../config')

const NAMESPACE = config.NAMESPACE

//middleware, will check the token
// calls in server/blogEditor.js
exports.checkJTW = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 50,
        jwksUri: 'https://dev--x6y-59y.eu.auth0.com/.well-known/jwks.json'
    }),
    // clientID
    audience: 'JGcmOSpCzImmzYY1FG4xfTv0Qap2VkEv',
    //Domain with "https://"
    issuer: 'https://dev--x6y-59y.eu.auth0.com/',
    algorithms: ['RS256']
})

exports.checkRole = role => (req, res, next) => {
        const user = req.user;
        if (user && user[NAMESPACE + '/roles'] && (user[NAMESPACE + '/roles'] === role)) {
            next();
        } else{
            return res.status(401).send({title: 'Not Authorizerd', detail: 'Not authorized to access this data'})
        }
}
