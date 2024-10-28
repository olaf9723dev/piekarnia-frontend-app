// http.service.js

'use strict';

import {getToken} from './auth.service';
import {config} from "../config";
const axios = require('axios');

const get = (url, without_auth = false, many= false) => {
    return new Promise(async (resolve, reject) => {
        let headers = {
            'Content-Type': 'application/json',
            'Accept-Language': 'pl' // TODO: get it from user selection
        }
        if (!without_auth) {
            const authHeaders = await getHeaders();
            headers = {...headers, ...authHeaders};
        }
        axios.get(`${config.apiUrl}${url}`, {
            headers
        })
            .then(res => {
                if (res.data) {
                    if (res.data.results && !many) {
                        resolve(res.data.results);
                    } else {
                        resolve(res.data);
                    }
                }
            })
            .catch(err => reject(err));
    })
}

const post = (url, data, without_auth = false, additionalHeaders = []) => {
    return new Promise(async (resolve, reject) => {
        let headers = {
            'Content-Type': 'application/json',
            'Accept-Language': 'pl' // TODO: get it from user selection
        }
        if (!without_auth) {
            const authHeaders = await getHeaders();
            headers = {...headers, ...authHeaders};
        }
        if (additionalHeaders) {
            headers = {...headers, ...additionalHeaders}
        }
        axios.post(`${config.apiUrl}${url}`, data, {
            headers
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

const put = (url, data, without_auth = false) => {
    return new Promise(async (resolve, reject) => {
        let headers = {
            'Content-Type': 'application/json',
            'Accept-Language': 'pl' // TODO: get it from user selection
        }
        if (!without_auth) {
            const authHeaders = await getHeaders();
            console.log(authHeaders)
            headers = {...headers, ...authHeaders};
        }
        axios.put(`${config.apiUrl}${url}`, data, {
            headers
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

const del = (url, without_auth = false) => {
    return new Promise(async (resolve, reject) => {
        let headers = {
            'Content-Type': 'application/json',
            'Accept-Language': 'pl' // TODO: get it from user selection
        }
        if (!without_auth) {
            const authHeaders = await getHeaders();
            headers = {...headers, ...authHeaders};
        }
        axios.delete(`${config.apiUrl}${url}`, {
            headers
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

const download = (url, without_auth = false) => {
    return new Promise(async (resolve, reject) => {
        let headers = {}
        if (!without_auth) {
            const authHeaders = await getHeaders();
            headers = {...headers, ...authHeaders};
        }
        axios({
            url: `${config.apiUrl}${url}`,
            method: 'GET',
            responseType: 'blob',
            headers
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

const upload = (url, file, filename, without_auth = false) => {
    return new Promise(async (resolve, reject) => {
        let headers = {
            'Content-Type': 'multipart/form-data'
        }
        if (!without_auth) {
            const authHeaders = await getHeaders();
            headers = {...headers, ...authHeaders};
        }
        const formData = new FormData();
        formData.append('image', file, filename);
        axios.post(`${config.apiUrl}${url}`, formData, {
            headers
        })
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}

const getHeaders = async () => {
    return new Promise(resolve => {
        getToken()
            .then(res => {
                if (res) {
                    resolve({
                        'Authorization': `Bearer ${res}`
                    })
                } else {
                    resolve({})
                }
            })
            .catch(() => {
                resolve({});
            })
    })
}

export {
    get,
    post,
    put,
    del,
    download,
    upload
}
