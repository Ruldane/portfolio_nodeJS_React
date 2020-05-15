import React from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import { Row, Container, Col } from 'reactstrap';
import ReactTyped from 'react-typed';


class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFlipping:false,
        }

        this.roles= ['Développeur front-end', 'Tech Lover', 'Travail en équipe', 'Hard worker']
    }

    componentDidMount() {
        this.animateCard()
    }

    componentWillUnmount() {
        this.cartAnimationInterval && clearInterval(this.cartAnimationInterval);
    }

    animateCard() {
        this.cartAnimationInterval = setInterval(() => {
            this.setState({
                isFlipping: !this.state.isFlipping
            })
        }, 3000)
    }

    render () {

        const {isAuthenticated, user} = this.props.auth;
        const {isFlipping} = this.state;

        return (
            <BaseLayout
                className={`cover ${isFlipping ? 'cover-1' : 'cover-0'}`} {...this.props.auth}
                headerType={"index"}
                title="Nizzoli Laurent - portfolios"
            >
                <div className="main-section">
                    <div className="background-image">
                        <img src="/images/background-index.png" alt="Background image"/>
                    </div>
                    <Container>
                        <Row>
                            <Col md="6">
                                <div className="hero-section">
                                    <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                                        <div className="front">
                                            <div className="hero-section-content">
                                                <h2> Développeur Web </h2>
                                                <div className="hero-section-content-intro">
                                                    Prenez le temps de regarder mon site web
                                                </div>
                                            </div>
                                            <img className="image" src="/images/section-1.jpg" alt="Guy programming welcome picture face"/>
                                            <div className="shadow-custom ">
                                                <div className="shadow-inner"> </div>
                                            </div>
                                        </div>

                                        <div className="back">
                                            <div className="hero-section-content">
                                                <h2> Get Your Projects Done </h2>
                                                <div className="hero-section-content-intro">
                                                   Top professionnal in web development
                                                </div>
                                            </div>
                                            <img className="image" src="/images/section-2.jpg" alt="Guy programming welcome picture back"/>
                                            <div className="shadow-custom shadow-custom-2">
                                                <div className="shadow-inner"> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="6" className="hero-welcome-wrapper">
                                <div className="hero-welcome-text">
                                    <h1>
                                        Après avoir passé un titre professionnel de développeur logiciel j'ai intégré
                                        une licence en développement orientée sécurité informatique.
                                        Actuellement chez Actif Solution, je travaille sur une application web, eScale.
                                        Les technologies utilisées sont React JS et Symfony.
                                    </h1>
                                </div>
                                <ReactTyped
                                    loop
                                    typeSpeed={60}
                                    backSpeed={60}
                                    strings={this.roles}
                                        backDelay={1000}
                                        loopCount={0}
                                        showCursor
                                        className="self-typed"
                                        cursorChar="|"
                                        />
                                <div className="hero-welcome-bio">
                                    <h2>
                                        {isAuthenticated && <span><br/><b><p>Bonjour {user.name} </p><br/></b></span>}
                                        N'hésitez pas à me contacter pour plus d'informations
                                    </h2>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <span>
                        <a href="https://www.vecteezy.com/free-vector/programming" className="service-link">Programming Vectors by Vecteezy</a>
                    </span>
                </div>
            </BaseLayout>
        )
    }
}

export default Index;
