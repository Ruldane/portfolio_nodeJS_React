import React from 'react';
import Auth0 from '../services/auth0'
import Fonts from '../helpers/Fonts'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/main.scss";
import 'react-toastify/dist/ReactToastify.css';

require('react-datepicker/dist/react-datepicker.css')

// const namespace = 'http://localhost:3000'


class App extends React.Component {

    static async getInitialProps({Component, ctx}) {
        let pageProps = {};
        const user = process.browser ? await Auth0.clientAuth() : await Auth0.serverAuth(ctx.req);
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        const isSiteOwner = user && user[process.env.NAMESPACE+'/roles'] === 'siteOwner';

        const auth = {user, isAuthenticated: !!user, isSiteOwner}

        return { pageProps, auth };
    }

/*    componentDidMount () {
        Fonts();
    }*/

    render() {
        const { Component, pageProps, auth } = this.props;
        return <Component {...pageProps} auth={auth}/>
    }
}

export default App;
