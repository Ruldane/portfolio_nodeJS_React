import React from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasaPage";
import Auth0Client from "../services/auth0"
import {withRouter} from "next/router";

class Callback extends React.Component {

    async componentDidMount() {
        await Auth0Client.handleAuthentication();
        this.props.router.push('/');
    }

    render () {

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>Hello world from callback pages</h1>
                    <p>You are login in</p>
                </BasePage>
            </BaseLayout>

        )
    }
}

export default withRouter(Callback);
