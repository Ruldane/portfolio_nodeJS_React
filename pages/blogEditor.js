import React from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasaPage";
import Router from 'next/router'
import { ToastContainer, toast } from 'react-toastify';

import SlateEditor from "../components/slate-editor/Editor";

import withAuth from '../components/hoc/withAuth'

import {createBlog} from "../actions";

class BlogEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isSavingBlog: false,
            lockId: Math.floor(1000 + Math.random() * 9000)
        }

        this.saveBlog = this.saveBlog.bind(this);
}

    saveBlog(story, heading) {
        const {lockId} = this.state;
        const blog = {};
        blog.title= heading.title
        blog.subtitle = heading.subtitle
        blog.story = story;

        this.setState({isSavingBlog: true})

        createBlog(blog, lockId).then((createdBlog)=> {
            this.setState({isSavingBlog: false})
            toast.success("Blog created with Success");
            Router.push(`/blogs/${createdBlog._id}/edit`)
        }).catch((error)=>{
            this.setState({isSavingBlog: false})
            toast.error("Something Wrong here" )
            const message = error.message || 'SERVER ERROR'
            console.error(message)
        })
    }

    render () {
        const {isSavingBlog} = this.state;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="blog-editor-page">
                    <SlateEditor isLoading={isSavingBlog} save={this.saveBlog}/>
                    <ToastContainer/>
                </BasePage>
            </BaseLayout>

        )
    }
}

export default withAuth(BlogEditor, 'siteOwner');
