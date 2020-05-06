import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from "../components/BasaPage";
import {getPortfolios} from "../actions";
import {Row, Col, CardTitle, CardText, CardBody, CardHeader, Card} from "reactstrap";

class Portfolios extends React.Component {

    static async getInitialProps() {
        let portfolios =  [];

        try {
            portfolios = await getPortfolios()
        }catch (e) {
            console.log(e);
        }
        return {portfolios}
    }

    renderPosts(portfolios) {
        return portfolios.map((portfolio, index) =>
            <Col md="4" key={index}>
                <React.Fragment>
                    <span>
                        <Card className="portfolio-card">
                            <CardHeader className="portfolio-card-header">{portfolio.position} </CardHeader>
                            <CardBody>
                                <p className="portfolio-card-city"> {portfolio.location}  </p>
                                <CardTitle className="portfolio-card-title">{portfolio.title} </CardTitle>
                                <CardText className="portfolio-card-text">{portfolio.description} </CardText>
                                <div className="readMore"> </div>
                            </CardBody>
                        </Card>
                    </span>
                </React.Fragment>
            </Col>

        )
    }

    render() {
        const { portfolios } = this.props;
        return (

                <BaseLayout {...this.props.auth}>
                    <BasePage className="portfolio-page" title={"Portfolios"}>
                        <Row>
                            {this.renderPosts(portfolios)}
                        </Row>
                    </BasePage>
                </BaseLayout>

        )
    }
}

export default Portfolios;
