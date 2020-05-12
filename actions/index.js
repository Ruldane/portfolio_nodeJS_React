import axios from 'axios'
import Cookies from 'js-cookie'
import { getCookieFromReq } from "../helpers/utils";

const axiosInstance = axios.create({
    baseURL : 'http://localhost:3000/api/v1',
    timeout: 3000
});

const setAuthHeader = (req) => {
    const token = req? getCookieFromReq(req, 'jwt') :Cookies.getJSON('jwt');
    if (token) {
        return {headers: {'authorization': `Bearer ${token}`}}
    }
    return undefined;
}

const rejectPromise = (resError) => {
    let error = {};

    if(resError && resError.res && resError.res.data) {
        error = resError.res.data
    } else {
        error = resError;
    }
    return Promise.reject(error);
}

export  const getSecretData = async (req) => {
    // req means, displaying on a server, so full path OR on a browser
    const url = req ? 'http://localhost:3000/api/v1/secret' : '/api/v1/secret'

    return await axios.get(url, setAuthHeader(req)).then((res) => {
        return res.data;
    });
}

export  const getPortfolios = async () => {
    // req means, displaying on a server, so full path OR on a browser
    const url =  '/portfolios'

    return await axiosInstance.get(url).then((res) => {
        return res.data;
    });
}

export const getPortfolioById = async (id) => {
    return await axiosInstance.get(`/portfolios/${id}`).then((res) => {
        return res.data;
    })
}

export const createPortfolio =  async (portfolioData) => {

    return axiosInstance.post('/portfolios', portfolioData, setAuthHeader())
        .then((res) => {
        return res.data
    }).catch((error)=> {
            return rejectPromise(error)
    })
}

export const updatePortfolio = async (portfolioData) => {
    return await axiosInstance.patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
        .then(response => response.data)
        .catch(error => rejectPromise(error))
}

export const deletePortfolio = (portfolioId) => {
    return axiosInstance.delete(`/portfolios/${portfolioId}`, setAuthHeader()).then((res) =>{
        return res.data;
    })
}

// BLOG ACTIONS
export const createBlog = (blogData, lockId) => {
    return axiosInstance.post(`/blogs?lockId=${lockId}`, blogData, setAuthHeader())
        .then(response => response.data)
        .catch(error => rejectPromise(error))
}

export const getBlogById = async (blogId) => {
    return await axiosInstance.get(`/blogs/${blogId}`).then((res) => {
        return res.data;
    })
}

export const updateBlog = (blogData, blogId) => {
    return axiosInstance.patch(`/blogs/${blogId}`, blogData, setAuthHeader())
        .then(response => response.data)
        .catch(error => rejectPromise(error))
}

export  const getUsersBlogs = async (req) => {
    // req means, displaying on a server, so full path OR on a browser
    const url = '/blogs/me'

    return await axiosInstance.get(url, setAuthHeader(req))
        .then(response => response.data)
        .catch(error => rejectPromise(error))
}

export const deleteBlog = (blogId) => {
    return axiosInstance.delete(`/blogs/${blogId}`, setAuthHeader())
        .then(response => response.data)
        .catch(error => rejectPromise(error))
}

export const getBlogs = async () => {
    return await axiosInstance.get('/blogs').then((res)=> {
        return res.data
    })
}

export const getBlogBySlug = async (slug) => {
    return await axiosInstance.get(`/blogs/s/${slug}`)
        .then((res)=> {
            return res.data
        })
}
