import React from 'react'
import {Button, Card, CardBody, CardHeader, CardText, CardTitle} from "reactstrap";
import Router from "next/router";

export default class PortFolioCard extends React.Component {

    constructor(props) {
        super(props);

        const {portfolio} = this.props;
    }

    render() {

        return (
            <span>
                        <Card className="portfolio-card">
                            <CardHeader className="portfolio-card-header">{portfolio.position} </CardHeader>
                            <CardBody>
                                <p className="portfolio-card-city"> {portfolio.location}  </p>
                                <CardTitle className="portfolio-card-title">{portfolio.title} </CardTitle>
                                <CardText className="portfolio-card-text">{portfolio.description} </CardText>
                                <div className="readMore">
                                 { isAuthenticated && isSiteOwner &&
                                 <React.Fragment>
                                     <Button onClick={() => Router.push(`/portfolios/${portfolio._id}/edit`)} color="warning">Edit</Button>{' '}
                                     <Button onClick={() => this.displayDeleteWarning(portfolio._id)} color="danger">Delete</Button>
                                 </React.Fragment>
                                 }
                                </div>
                            </CardBody>
                        </Card>
                    </span>
        )
    }
}
