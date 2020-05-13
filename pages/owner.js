import React from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasaPage";

import withAuth from "../components/hoc/withAuth";

class Owner extends React.Component {

    render () {

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>Hello world for Owner page</h1>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth(Owner, "siteOwner");
