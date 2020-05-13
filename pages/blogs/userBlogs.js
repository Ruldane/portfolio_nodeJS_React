import React from 'react';
import BaseLayout from "../../components/layouts/BaseLayout";
import BasePage from "../../components/BasaPage";
import ButtonDropdown from '../../components/ButtonDropdown'

import withAuth from '../../components/hoc/withAuth'
import {Container, Row, Col, Button} from "reactstrap";
import Link from 'next/link'
import Router from "next/router";

import {getUsersBlogs, updateBlog, deleteBlog} from '../../actions'



class UserBlogs extends React.Component {

    static async getInitialProps({req}) {
        let blogs = [];
        try{
            blogs = await getUsersBlogs(req);
        }catch (e) {
            console.error(error)
        }
        return {blogs}
    }

    changeBlogStatus(status,blogId) {
        try {
            updateBlog( {status}, blogId)
                .then(() => {
                    Router.push('/blogs/userblogs');
                })

        }catch (error) {
            console.error(error)
        }
    }

    deleteBlogWarning (blogId) {
        const res = confirm('Are you sure you want to delete this blog post ?');
        if (res)  {
            this.deleteBlog(blogId);
            Router.push('/blogs/userblogs');
        }
    }

    deleteBlog(blogId) {
        deleteBlog(blogId).then((status)=> {

        }).catch((error)=> {
            console.error(error)
        })
    }

    separedBlogs (blogs){
        const published = [];
        const drafts = [];

        blogs.map((blog)=> {
            blog.status === 'draft' ? drafts.push(blog) : published.push(blog)
        })
        return {published, drafts}
    }

    createStatus(status) {
        return status === 'draft' ? {view: 'Publish Story', value: 'published'}
                                    : {view: 'Make a Draft', value: 'draft'}
    }

    dropdownOptions = (blog) => {
        const blogStatus = this.createStatus(blog.status)

        return [
            {text: blogStatus.view, handlers: {onClick: () => this.changeBlogStatus(blogStatus.value, blog._id)}},
            {text: 'Delete', handlers: {onClick: () => this.deleteBlogWarning(blog._id)}}
        ]
    }

    renderBlogs(blogs) {
        return (
            <ul className="user-blogs-list">
                {
                    blogs.map((blog, index)=> {
                        return (
                            <li key={index}>
                                <Link href="/blogs/[id]/edit"  as={`/blogs/${blog._id}/edit`}>
                                    <a> {blog.title}</a>
                                </Link>
                            <ButtonDropdown items={this.dropdownOptions(blog)}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render () {
        const {blogs} = this.props;
        const {published, drafts} = this.separedBlogs(blogs);

        return (
            <BaseLayout headerType={'landing'} {...this.props.auth}>
                <div className="masthead" style={{"backgroundImage": "url('/images/home-bg.jpg')"}}>
                    <div className="overlay"></div>
                    <Container>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="site-heading">
                                    <h1>Dashboard</h1>
                                    <span className="subheading">
                                        Voyons quels articles vont être publiés {' '}
                                            <Button onClick={() => Router.push('/blogEditor')} color="primary">Créer un nouvel article</Button>
                                      </span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <BasePage className="blog-user-page text-center">
                    <Row>
                        <Col md="6" className="mex-auto text-center">

                            <h2 className="blog-status-title"> Articles publiés </h2>
                            {this.renderBlogs(published)}
                        </Col>
                        <Col md="6" className="mex-auto">
                            <h2 className="blog-status-title"> Brouillons </h2>
                            {this.renderBlogs(drafts)}
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth(UserBlogs, 'siteOwner');
