import React from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasaPage";

import SlateEditor from "../components/slate-editor/Editor";

import withAuth from '../components/hoc/withAuth'

class BlogEditor extends React.Component {
    render () {
        return (

            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="blog-editor-page" title={"I am blog editor page"}>
                    <SlateEditor/>
                </BasePage>
            </BaseLayout>

        )
    }
}

export default withAuth(BlogEditor, 'siteOwner');
