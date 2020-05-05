import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from "../components/BasaPage";

import axios from 'axios';
import {Row, Col, CardTitle, CardText, CardBody, CardHeader, Card} from "reactstrap";

class Portfolios extends React.Component {

    static async getInitialProps() {
        let posts = [];
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            posts = res.data;
        } catch(e) {
            console.error(e);
        }

        return { posts: posts.slice(0, 10) };
    }

    renderPosts(posts) {
        return posts.map(post =>
            <Col md="4">
                <React.Fragment>
                    <span>
                        <Card className="portfolio-card">
                            <CardHeader className="portfolio-card-header">Some Position </CardHeader>
                            <CardBody>
                                <p className="portfolio-card-city"> Some Location  </p>
                                <CardTitle className="portfolio-card-title">Some Company </CardTitle>
                                <CardText className="portfolio-card-text">Some Description </CardText>
                                <div className="readMore"> </div>
                            </CardBody>
                        </Card>
                    </span>
                </React.Fragment>
            </Col>

        )
    }

    render() {
        const { posts } = this.props;
        return (

                <BaseLayout {...this.props.auth}>
                    <BasePage className="portfolio-page" title={"Portfolios"}>
                        <Row>
                            {this.renderPosts(posts)}
                        </Row>
                    </BasePage>
                </BaseLayout>

        )
    }
}

export default Portfolios;
