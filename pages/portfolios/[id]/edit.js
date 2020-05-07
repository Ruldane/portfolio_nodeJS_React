import React from 'react';
import BaseLayout from "../../../components/layouts/BaseLayout";
import BasePage from "../../../components/BasaPage";
import PortfolioCreateForm from '../../../components/portfolios/PortfolioCreateForm'
import { Row, Col } from 'reactstrap'
import { updatePortfolio, getPortfolioById } from '../../../actions'
import Router from 'next/router'

import withAuth from '../../../components/hoc/withAuth'

class PortfolioEdit extends React.Component {

    static async getInitialProps({query}){
        let portfolio = {};

        try{
            portfolio = await getPortfolioById(query.id)

        }catch (error) {
            console.error(error)
        }
        console.log(portfolio)
        return {portfolio}
    }

    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
        }

        this.updatePortfolio = this.updatePortfolio.bind(this)
    }


    updatePortfolio(portfolioData, {setSubmitting}) {
        setSubmitting(true);

        updatePortfolio(portfolioData)
            .then((portfolio) => {
                setSubmitting(false);
                this.setState({error: undefined});
                Router.push('/portfolios');
            })
            .catch((err) => {
                const error = err.message || 'Server Error!';
                setSubmitting(false);
                this.setState({error});
            })
    }

    render () {
        const {error} = this.state;
        const { portfolio } = this.props;
        return (

            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-create-paget-page" title={"Edit portfolio"}>
                    <Row>
                        <Col md="6">
                            <PortfolioCreateForm
                                initialValues={portfolio}
                                onSubmit={this.updatePortfolio}
                                error={error}/>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>

        )
    }
}

export default withAuth(PortfolioEdit, 'siteOwner');
