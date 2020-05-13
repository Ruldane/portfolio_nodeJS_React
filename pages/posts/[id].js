import React from 'react';
import BaseLayout from '../../components/layouts/BaseLayout';
import axios from 'axios';

class Posts extends React.Component {
    static async getInitialProps({query}) {
        let posts = {};
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${query.id}`);
            posts = res.data;
        } catch (e) {
            console.error(e);
        }
        return {posts};
    }

    render() {
        const {posts} = this.props;
        return (
            <BaseLayout {...this.props.auth}>
                <h1>I am Portfolio page</h1>
                <h1>{posts.title}</h1>
                <p>BODY: {posts.body}</p>
                <p>ID: {posts.id}</p>
            </BaseLayout>
        )
    }
}

export default Posts;
