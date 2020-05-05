import React from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import { Row, Container, Col } from 'reactstrap';
import ReactTyped from 'react-typed';


class Index extends React.Component {

    constructor(props) {
        super(props);

        this.roles= ['Développeur front-end', 'Tech Lover', 'Team player', 'Hard worker']
    }

    render () {

        const {isAuthenticated, user} = this.props.auth;

        return (
            <BaseLayout className="cover" {...this.props.auth} headerType={"index"}>
                <div className="main-section">
                    <div className="background-image">
                        <img src="/images/background-index.png" />
                    </div>
                    <Container>
                        <Row>
                            <Col md="6">
                                <div className="hero-section">
                                    <div className={`flipper`}>
                                        <div className="back">
                                            <div className="hero-section-content">
                                                <h2> Full Stack Web Developer </h2>
                                                <div className="hero-section-content-intro">
                                                    Have a look at my portfolio and job history.
                                                </div>
                                            </div>
                                            <img className="image" src="/images/section-1.png"/>
                                            <div className="shadow-custom">
                                                <div className="shadow-inner"> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="6" className="hero-welcome-wrapper">
                                <div className="hero-welcome-text">
                                    <h1>
                                        node-lipsum is a NodeJS Module and Command-line Interface combo that provides a service API for lipsum.com,
                                        which you may or may not know as the go-to place to generate arbitrary dummy text whenever you need it.
                                        Node-lipsum can be used right from the command line by invoking node-lipsum (assuming you've installed it globally) or
                                        as a node module.
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
                                    <h1>
                                        {isAuthenticated && <span><br/><b>{user.name}<br/></b></span>}
                                        Let's take a look on my work.
                                    </h1>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </BaseLayout>
        )
    }
}

export default Index;
