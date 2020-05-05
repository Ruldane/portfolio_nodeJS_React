import React from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasaPage";

import withAuth from '../components/hoc/withAuth'

class About extends React.Component {
    render () {
        return (

                <BaseLayout {...this.props.auth}>
                    <BasePage className="about-page" title={"I am about page"}>
                    </BasePage>
                </BaseLayout>

        )
    }
}

export default About;
