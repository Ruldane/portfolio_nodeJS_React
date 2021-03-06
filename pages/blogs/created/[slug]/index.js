import React from 'react';
import BaseLayout from "../../../../components/layouts/BaseLayout";
import BasePage from "../../../../components/BasaPage";
import {getBlogBySlug} from "../../../../actions"
import {Row, Col} from 'reactstrap'


class About extends React.Component {

    static async getInitialProps ({query}) {
        let blog = {};
        const slug = query.slug;

        try {
            blog = await getBlogBySlug(slug);

        }catch (error) {
            console.error(error)
        }
        return {blog}
    }

    render () {
        const {blog} = this.props;
        return (

            <BaseLayout {...this.props.auth}>
                <BasePage className="blog-detail-page">
                    <Row>
                        <Col md={{size: 8, offset: 2}}>
                            <div dangerouslySetInnerHTML={{__html: blog.story}}></div>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>

        )
    }
}

export default About;
