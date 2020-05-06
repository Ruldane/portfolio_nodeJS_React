import React from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasaPage";
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm'
import {Row, Col} from 'reactstrap'

import {createPortfolio} from '../actions'
import { Router } from '../routes'

import withAuth from '../components/hoc/withAuth'

class PortfolioNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
        }

        this.savePortfolio = this.savePortfolio.bind(this)
    }


    savePortfolio(portfolioData, {setSubmitting}) {
        setSubmitting(true)
        createPortfolio(portfolioData).then((portfolio) =>{
            setSubmitting(false);
            this.setState({error: undefined})
            Router.pushRoute('/portfolios')
        }).catch((err) => {
            const error = err.message || 'Server Error'
            setSubmitting(false);
            this.setState({error})
            console.error(error)
        })
    }

    render () {
        const {error} = this.state;
        return (

            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-create-paget-page" title={"create New Portfolio"}>
                    <Row>
                        <Col md="6">
                            <PortfolioCreateForm onSubmit={this.savePortfolio} error={error}/>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>

        )
    }
}

export default withAuth(PortfolioNew, 'siteOwner');
