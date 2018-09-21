import {apiPost} from '../utils/request';

export const test = {
    login: function (data, success, fail) {
        return apiPost('/token/v1/login', data, success, fail);
    }
};
