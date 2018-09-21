// 引用axios
import axios from 'axios';
import qs from 'qs';
import router from '../router';
// import {Cookie} from './cookie'
axios.defaults.baseURL = process.env.hosturl;

const codeErr = {
    tokenTimeOut: '-6'
};

// http request 拦截器
axios.interceptors.request.use(config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
        if (typeof (config.data) !== 'string') {
            config.data = JSON.stringify(qs.stringify(config.data));
        }
        config.headers['Content-Type'] = 'application/json';
    }
    // if (Cookie.get(Cookie.tokenKey)) {
    //     config.headers['token'] = Cookie.get(Cookie.tokenKey);
    // }
    return config;
}, err => {
    return Promise.reject(err);
});

export const apiGet = function (url, data, success, fail) {
    let path;
    if (Object.prototype.toString.call(data) === '[object Object]') {
        let tempArr = Object.keys(data);
        if (tempArr.length > 0) {
            path = url + '?';
            tempArr.forEach(function (item) {
                if ((data[item].toString()).length > 0) {
                    path = path + item + '=' + data[item] + '&';
                }
            });
            path = path.substring(0, path.length - 1);
        } else {
            path = url;
        }
        return axios.get(path).then(function (res) {
            // token 过期
            if (res.data.code == codeErr.tokenTimeOut) {
                let refreshToken = {
                    // refreshToken: Cookie.get(Cookie.refreshTokenKey)
                };
                axios.post('/token/v1/refreshToken', JSON.stringify(refreshToken)).then(function (response) {
                    if (response.data.code == '0') {
                        // Cookie.set(Cookie.tokenKey, response.data.data.token);
                        // Cookie.set(Cookie.refreshToken, response.data.data.refreshToken);
                        axios.get(path).then(function (result) { // 刷新token之后重新发送之前发送失败的请求
                            if (result.data.code == '0') { // 成功
                                success(result);
                            } else {
                                if (fail) { // 判断是否传入错误处理回调
                                    fail(res);
                                }
                            }
                        });
                        // }else if (response.data.code == '-3') {
                    } else {
                        // Cookie.remove(Cookie.tokenKey);
                        // Cookie.remove(Cookie.refreshTokenKey);
                        router.replace({
                            path: '/',
                            query: { redirect: router.currentRoute.fullPath }
                        });
                    }
                });
            } else if (res.data.code == '0') {
                success(res);
            } else {
                if (fail) {
                    fail(res);
                }
            }
        });
    } else {
        throw new Error('Data Must be a Object');
    }
};
export const apiPost = function (url, data, success, fail) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
        return axios.post(url, JSON.stringify(data)).then(function (res) {
            if (res.data.code == codeErr.tokenTimeOut) {
                let refreshToken = {
                    // refreshToken: Cookie.get(Cookie.refreshTokenKey)
                };
                // axios.post
                axios.post('/token/v1/refreshToken', JSON.stringify(refreshToken)).then(function (response) {
                    if (response.data.code == '0') {
                        // Cookie.set(Cookie.tokenKey, response.data.data.token);
                        // Cookie.set(Cookie.refreshToken, response.data.data.refreshToken);
                        axios.post(url, JSON.stringify(data)).then(function (result) {
                            if (result.data.code == '0') {
                                success(result);
                            } else {
                                if (fail) { // 判断是否传入错误处理回调
                                    fail(res);
                                }
                            }
                        });
                    } else {
                        // Cookie.remove(Cookie.tokenKey);
                        // Cookie.remove(Cookie.refreshTokenKey);
                        router.replace({
                            path: '/',
                            query: { redirect: router.currentRoute.fullPath }
                        });
                    }
                });
            } else if (res.data.code == '0') {
                success(res);
            } else {
                if (fail) {
                    fail(res);
                }
            }
        });
    }
};
