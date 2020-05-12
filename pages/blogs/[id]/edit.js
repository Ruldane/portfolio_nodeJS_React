
import React from 'react';
import BaseLayout from "../../../components/layouts/BaseLayout";
import BasePage from "../../../components/BasaPage";

import SlateEditor from "../../../components/slate-editor/Editor";
import { ToastContainer, toast } from 'react-toastify';

import withAuth from '../../../components/hoc/withAuth'


import {updateBlog, getBlogById} from "../../../actions";
import Router from "next/router";

class EditBlog extends React.Component {

    static async getInitialProps({query}){
        const blogId = query.id
        let blog = {}

        try {
            blog = await getBlogById(blogId)
            return {blog}
        }catch (error) {
            console.log(error)
        }
        return {blog}
    }

    constructor(props) {
        super(props);

        this.state = {
            isSavingBlog: false
        }
        this.updateBlog = this.updateBlog.bind(this)
    }


    updateBlog(story, heading) {
        const {blog} = this.props;

        const updatedBlog = {};
        updatedBlog.title = heading.title;
        updatedBlog.subTitle = heading.subtitle;
        updatedBlog.story = story;

        this.setState({isSaving: true});

        updateBlog(updatedBlog, blog._id).then(updatedBlog => {
            toast.success("Blog Saved with Success");
            this.setState({isSaving: false});
        }).catch(err => {
            this.setState({isSaving: false});
            const message = err.message || 'Server Error!';
            toast.error("Something Wrong here" )
            console.error(message);
        })
    }
    render () {
        const {blog} = this.props;
        console.log(blog);
        const {isSavingBlog} = this.state;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="blog-editor-page">
                    <SlateEditor initialValue={blog.story} isLoading={isSavingBlog} save={this.updateBlog}/>
                    <ToastContainer />
                </BasePage>
            </BaseLayout>

        )
    }
}

export default withAuth(EditBlog, 'siteOwner');
