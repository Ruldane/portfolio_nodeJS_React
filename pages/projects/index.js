import React from 'react';
import BaseLayout from '../../components/layouts/BaseLayout';
import BasePage from "../../components/BasaPage";
import {getProjects} from "../../actions";
import {Row, Col, Button} from "reactstrap";
import GridProject from '../../components/project/GridProject'

import Router from 'next/router'

class Projects extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps() {
        let projects =  [];

        try {
            projects = await getProjects()
        }catch (e) {
            console.error(e);
        }
        return {projects}
    }

    renderProject(projects) {
        const {isAuthenticated, isSiteOwner} = this.props.auth;

        return projects.map((project, index) =>
            <Col md="4" key={index}>
                <GridProject project={project} />
            </Col>
        )
    }


    render() {
        const { projects } = this.props;
        const {isAuthenticated, isSiteOwner} = this.props.auth;

        return (
            <BaseLayout {...this.props.auth} title="Laurent Nizzoli - Projets">
                <BasePage className="project-page" title={"Mes Projets"}>
                    <Row>
                        {this.renderProject(projects)}
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default Projects;
