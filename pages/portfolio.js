import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import axios from 'axios';

class Portfolio extends React.Component {
    static async getInitialProps({query}) {
        let post = {};
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${query.id}`);
            post = res.data;
        } catch (e) {
            console.error(e);
        }
        return {portfolio: post};
    }

    render() {
        const {portfolio} = this.props;
        return (
            <BaseLayout {...this.props.auth}>
                <h1>I am Portfolio page</h1>
                <h1>{portfolio.title}</h1>
                <p>BODY: {portfolio.body}</p>
                <p>ID: {portfolio.id}</p>
            </BaseLayout>
        )
    }
}

export default Portfolio;
