import React from 'react';
import BaseLayout from '../../components/layouts/BaseLayout';
import BasePage from '../../components/BasaPage';
import { Container, Row, Col } from 'reactstrap';
import { getBlogs } from '../../actions';
import moment from 'moment';
import Link from "next/link";

class Blogs extends React.Component {

    static async getInitialProps({req}) {
        let blogs = [];

        try {
            blogs = await getBlogs(req);
        } catch(err) {
            console.error(err);
        }

        return {blogs};
    }

    renderBlogs(blogs) {
        return blogs.map((blog, index) =>
            <div key={index} className="post-preview">
                <Link href="/blogs/created/[slug]"  as={`/blogs/created/${blog.slug}`}>
                    <a>
                        <h2 className="post-title">
                            {blog.title}
                        </h2>
                    </a>
                </Link>
                        <h3 className="post-subtitle">
                            {blog.subtitle}
                        </h3>
                <p className="post-meta">Posted by
                    <a href="#"> {blog.author} </a>
                    {moment(blog.createAt).format('LL')}
                </p>
            </div>
        )
    }



    render() {
        const {blogs} = this.props;

        return (
            <BaseLayout headerType={'landing'}
                        className="blog-listing-page"
                        {...this.props.auth}
                        title="Laurent Nizzoli - Newest Blogs to Read">
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
                        <Col md="10" lg="8" className="mx-auto">
                            {
                                this.renderBlogs(blogs)
                            }
                            <div className="clearfix">
                                <a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
                            </div>
                        </Col>
                    </Row>

                    <footer>
                        <Container>
                            <Row>
                                <div className="col-lg-8 col-md-10 mx-auto">
                                    <ul className="list-inline text-center">
                                        <li className="list-inline-item">
                                            <a target="_blank" href="https://fr.linkedin.com/in/laurent-nizzoli-7b1296180">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
                        </span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                                <a target="_blank" href="https://github.com/ruldane">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                                            </a>
                                        </li>
                                    </ul>
                                    <p className="copyright text-muted">Copyright &copy; Filip Jerga 2018</p>
                                </div>
                            </Row>
                        </Container>
                    </footer>
                </BasePage>
                <style jsx>
                    {`
            @import url("https://use.fontawesome.com/releases/v5.5.0/css/all.css");
          `}
                </style>
            </BaseLayout>
        )
    }
}

export default Blogs;
