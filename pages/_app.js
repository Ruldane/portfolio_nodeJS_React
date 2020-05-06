import React from 'react';
import Auth0 from '../services/auth0'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/main.scss";
require('react-datepicker/dist/react-datepicker.css')



class App extends React.Component {

    static async getInitialProps({Component, ctx}) {
        let pageProps = {};
        const user = process.browser ? await Auth0.clientAuth() : await Auth0.serverAuth(ctx.req);
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        const auth = {user, isAuthenticated: !!user}

        return { pageProps, auth };
    }

    render() {
        const { Component, pageProps, auth } = this.props;
        return <Component {...pageProps} auth={auth}/>
    }
}

export default App;
