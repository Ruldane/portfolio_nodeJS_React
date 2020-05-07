import React from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasaPage";
import {Container, Row, Col} from 'reactstrap'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

class Blogs extends React.Component {

    render () {

        return (
            <BaseLayout headerType={'landing'} className="blog-listing-page" {...this.props.auth}>
                <div className="masthead" style={{"backgroundImage": "url('/images/home-bg.jpg')"}}>
                    <div className="overlay"></div>
                    <Container>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="site-heading">
                                    <h1>Fresh Blogs</h1>
                                    <span className="subheading">Programming, travelling...</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <BasePage className="blog-body">
                    <Row>
                    </Row>
                    <footer>
                        <Container>
                            <Row>
                                <div className="col-lg-8 col-md-10 mx-auto">
                                    <ul className="list-inline text-center">
                                        <li className="list-inline-item">
                                            <a href="#">
                  <span className="fa-stack fa-lg">
                   <TwitterIcon style={{ fontSize: 45 }} />
                  </span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#">
                  <span className="fa-stack fa-lg">
                   <GitHubIcon style={{ fontSize: 40 }} />
                  </span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#">
                  <span className="fa-stack fa-lg">
                    <LinkedInIcon style={{ fontSize: 50 }} />
                  </span>
                                            </a>
                                        </li>
                                    </ul>
                                    <p className="copyright text-muted">Copyright &copy; Laurent Nizzoli 2020</p>
                                </div>
                            </Row>
                        </Container>
                    </footer>
                </BasePage>
            </BaseLayout>


        )
    }
}

export default Blogs;
