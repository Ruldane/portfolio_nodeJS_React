import React from 'react'
import { Card, CardBody, CardHeader, CardText, CardTitle} from "reactstrap";
import PortfolioCardDetail from "./PortfolioCardDetal";

export default class PortFolioCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }

        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle () {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {portfolio, children} = this.props;
        const {isOpen} = this.state;
        return (
            <span onClick={this.handleToggle}>
                <PortfolioCardDetail toggle={this.handleToggle} isOpen={isOpen} portfolio={portfolio}/>
                <Card className="portfolio-card">
                    <CardHeader className="portfolio-card-header">{portfolio.position} </CardHeader>
                    <CardBody>
                        <p className="portfolio-card-city"> {portfolio.location}  </p>
                        <CardTitle className="portfolio-card-title">{portfolio.title} </CardTitle>
                        <CardText className="portfolio-card-text">{portfolio.description} </CardText>
                        <div className="readMore">
                            {children}
                        </div>
                    </CardBody>
                </Card>
            </span>
        )
    }
}


