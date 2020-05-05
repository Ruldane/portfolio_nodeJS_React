import auth0 from 'auth0-js'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from 'axios'

import {getCookieFromReq} from '../helpers/utils'

class Auth0 {
    constructor(props) {
        this.auth0 = new auth0.WebAuth({
            domain: 'dev--x6y-59y.eu.auth0.com',
            clientID: 'JGcmOSpCzImmzYY1FG4xfTv0Qap2VkEv',
            redirectUri: `http://localhost:3000/callback`,
            responseType: 'token id_token',
            scope: 'openid profile',
        });
        this.login = this.login.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.logout = this.logout.bind(this);
    }

    // first function
    login () {
        this.auth0.authorize();
    }

    async getJWKS () {
        try {
            const res = await axios.get('https://dev--x6y-59y.eu.auth0.com/.well-known/jwks.json');
            const jwks = res.data;
            return jwks;
            // obtain JWKS, check JWKS on auth0.com/docs/jwks
        }catch (e) {
            console.log(e)
            return e;
        }
    }

    // second function (to redirect to home/callback
    handleAuthentication () {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                    resolve();
                } else if (err) {
                    reject(err);
                    console.log(err);
                }
            });
        })
    }

    // using in handleAuthentication
    setSession (authResult) {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        // create cookies when session is active
        Cookies.set('jwt', authResult.idToken);
        Cookies.set('user', authResult.idTokenPayload)
        Cookies.set('expiresAt', expiresAt);
    }


    logout () {
        // delete cookies when logout
        Cookies.remove('jwt');
        Cookies.remove('user')
        Cookies.remove('expiresAt');

        this.auth0.logout({
            // redirect to home page
            returnTo: '',
            clientID: 'JGcmOSpCzImmzYY1FG4xfTv0Qap2VkEv',
        })
    }

    async verifyToken(token) {
        if (token) {
            const decodedToken = jwt.decode(token, { complete: true});

            if(!decodedToken) {
                return undefined;
            }

            if (!decodedToken) { return undefined; }

            const jwks = await this.getJWKS();
            const jwk = jwks.keys[0];

            // BUILD CERTIFICATE
            let cert = jwk.x5c[0];
            cert = cert.match(/.{1,64}/g).join('\n');
            cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

            if (jwk.kid === decodedToken.header.kid) {
                try {
                    const verifiedToken = jwt.verify(token, cert);
                    const expiresAt = verifiedToken.exp * 1000;

                    return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
                } catch(err) {
                    return undefined;
                }
            }
        }

        return undefined;
    }

   async clientAuth() {
        // check client side
        const token = Cookies.getJSON('jwt');
        return await this.verifyToken(token);
    }

    async serverAuth (req) {

        if (req.headers.cookie) {

            const token = getCookieFromReq(req, 'jwt')
            return await this.verifyToken(token);
        }
        return undefined;
    }
}

const auth0Client = new Auth0();

export default auth0Client;
