import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasaPage';

import { Row, Col } from 'reactstrap';

class About extends React.Component {

    render() {
        return (
            <BaseLayout  {...this.props.auth} title="À propos">
                <BasePage className="about-page" >
                    <Row className="mt-5">
                        <Col md="6">
                            <img src="/images/Nizzoli-Laurent.jpg" alt="photo de Laurent Nizzoli"  className="picture-of-me"/>
                            <div className="left-side">
                                <h1 className="title fadein">À PROPOS de moi</h1>
                                <h4 className="subtitle fadein">Un développeur web passionné</h4>
                                <p className="subsubTitle fadein">Voici mon parcours</p>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="fadein">
                                <p>Je m'appelle Laurent Nizzoli, j'habite sur Strasbourg.</p>
                                <p>
                                    Je suis actuellement en reconversion professionnelle suite à sept années dans l'administratif.
                                    J'ai eu la chance d'intégrer une formation en 2018 afin de passer le titre professionnel <b>Développeur logiciel </b>
                                    dans un centre de formation à Toulon.
                                    Suite à cela j'ai intégré une entreprise sur Strasbourg en septembre 2019, afin d'obtenir la licence professionnelle
                                    <b> Analyste génie informatique et réseaux orientation développement</b>.
                                </p>
                                <p>
                                    Lors de mes septs années dans le domaine administratif, j'ai acquéri certaines compétences importantes dans le métier
                                    de développeur web, tel que la concentration, la curiosité ou encore l'envie d'apprendre de nouvelles choses. En tant
                                    qu'assistant administratif, il était important de connaître les derniers articles de lois en vigueur.
                                    Durant ma formation Développeur logiciel, j'ai effectué un stage deux mois qui a été renouvellé pour quatre
                                    mois supplémentaires. Durant cette période, j'ai travaillé sur une application Android (codée en <b>Java</b>). <br/>
                                    J'ai également travaillé sur le site internet de l'entreprise codé avec <b>Zend Framework</b>. c'est dans cet univers
                                    que j'ai ainsi pu découvrir <b>Docker</b> car les <b>tests unitaires</b> devaient être lancés depuis un container indépendant.
                                </p>
                                <p>
                                    Ma passion pour le développement s'est révélée au sein d'Actif Solution, une ESN dont j'ai intégré l'agence sur Strasbourg. J'ai eu la chance de
                                    découvrir une application Web codée en <b>React JS</b> côté Front et <b>Symfony</b> côté Back. C'est à partir de ce moment que j'ai commencé
                                    réellement à coder et que je me suis rendu compte que j'adorai Javascript un langage puissant avec lequel il est possible de
                                    tout réaliser. <br/>
                                    Je suis intervenu principalement du côté <b>Front</b>. Depuis que mon travail a commencé chez Actif Solution, j'ai pris
                                    l'habitude de coder régulièrement tous les soirs.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default About;
