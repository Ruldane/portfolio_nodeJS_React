import React from 'react';
import BaseLayout from '../../components/layouts/BaseLayout';
import BasePage from "../../components/BasaPage";
import {getPortfolios, deletePortfolio} from "../../actions";
import {Row, Col, Button} from "reactstrap";
import PortFolioCard from '../../components/portfolios/portfolioCard'

import Router from 'next/router'

class Portfolios extends React.Component {

    static async getInitialProps() {
        let portfolios =  [];

        try {
            portfolios = await getPortfolios()
        }catch (e) {
            console.error(e);
        }
        return {portfolios}
    }

    navigateToEdit (portfolioId, event) {
        event.stopPropagation();
        Router.push(`/portfolios/${portfolioId}/edit`)
    }

    displayDeleteWarning (portfolioId, event) {
        event.stopPropagation();
        const isConfirm = confirm('Êtes-vous sûr de vouloir supprimer ce portfolio?');
        if (isConfirm){
            this.deletePortfolio(portfolioId)
        }
    }

    deletePortfolio (portfolioId) {
        deletePortfolio(portfolioId)
            .then(() => {
                Router.push('/portfolios')
            })
            .catch((error)=> {
                console.error(error)
            })

    }

    renderPortfolios(portfolios) {
        const {isAuthenticated, isSiteOwner} = this.props.auth;

        return portfolios.map((portfolio, index) =>
            <Col md="4" key={index}>
                <PortFolioCard portfolio={portfolio}>
                    { isAuthenticated && isSiteOwner &&
                    <React.Fragment>
                        <Button onClick={(event) => this.navigateToEdit(portfolio._id, event)} color="warning">Éditer</Button>{' '}
                        <Button onClick={(event) => this.displayDeleteWarning(portfolio._id, event)} color="danger">Supprimer</Button>
                    </React.Fragment>
                    }
                </PortFolioCard>
            </Col>
        )
    }

    render() {
        const { portfolios } = this.props;
        const {isAuthenticated, isSiteOwner} = this.props.auth;
        return (

            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-page" title={"Portfolios"}>
                    {isAuthenticated && isSiteOwner &&
                    <Button color="success"
                            onClick={() => Router.push('/portfolioNew')}
                            className='create-port-btn'>Créer Portfolio
                    </Button>
                    }
                    <Row>
                        {this.renderPortfolios(portfolios)}
                    </Row>
                </BasePage>
            </BaseLayout>

        )
    }
}

export default Portfolios;
