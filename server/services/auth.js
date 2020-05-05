const jwt = require('express-jwt'); // npm install express-jwt
const jwksRsa = require('jwks-rsa'); //npm install --save jwks-rsa

const namespace = 'http://localhost:3000/'

//middleware, will check the token
// calls in server/index.js
exports.checkJTW = jwt({
    secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 15,
            jwksUri: 'https://dev--x6y-59y.eu.auth0.com/.well-known/jwks.json'
    }),
    // clientID
    audience: 'JGcmOSpCzImmzYY1FG4xfTv0Qap2VkEv',
    //Domain with "https://"
    issuer: 'https://dev--x6y-59y.eu.auth0.com/',
    algorithms: ['RS256']
})

exports.checkRole =  (role) => {
    return  (req, res, next) => {
        const user = req.user;
        if (user && user[namespace + 'roles'] && (user[namespace + 'roles'] === role)) {
            next();
        } else{
            return res._status(401).send({title: 'Not Authorizerd', detail: 'Not authorized to access this data'})
        }
    }
}
