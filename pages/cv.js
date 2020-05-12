import React from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasaPage";
import {Row, Col} from "reactstrap"

class Cv extends React.Component {

    render () {

        return (
            <BaseLayout {...this.props.auth} className="cv-page">
                <BasePage title="Aperçu de mon CV">
                    <Row>
                        <Col md={{size: 8, offset:2}}>
                            <div className="cv-title">
                                <a download="cv_nizzoli_laurent.pdf" className="btn btn-success" href="cv_nizzoli_laurent.pdf">
                                    Télécharger
                                </a>
                            </div>
                            <iframe style={{width: '100%', height: '800px'}} src="cv_nizzoli_laurent.pdf">
                            </iframe>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}


export default Cv;
