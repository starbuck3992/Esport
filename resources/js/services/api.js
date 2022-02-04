import axios from "axios";
import store from "../store";

class Api {
    constructor() {
        let axiosInstance = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            withCredentials: true
        });
        axiosInstance.interceptors.request.use((config) => {
            store.commit('loadingModule/setLoading', true);
            return config;
        }, function (error) {
            store.commit('loadingModule/setLoading', false);
            return Promise.reject(error);
        });
        axiosInstance.interceptors.response.use(this.handleSuccess, this.handleError);
        this.api = axiosInstance;
    }

    handleSuccess(response) {

        store.commit('loadingModule/setLoading', false);
        return response;

    }

    handleError = (error) => {
        store.commit('loadingModule/setLoading', false);
        if (
            [402, 403, 419].includes(error.response.status) &&
            store.getters['userModule/loggedIn']
        ) {
            store.dispatch('userModule/logout').finally(function() {
                    return Promise.reject(error);
            })
        }
        return Promise.reject(error);
    }

    get(path) {
        return this.api.request({
            method: 'GET',
            url: path,
            responseType: 'json'
        })
    }

    patch(path, payload) {
        return this.api.request({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload
        })
    }

    post(path, payload, headers) {
        return this.api.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload,
            headers: headers
        })
    }

    put(path, payload, parameters) {
        return this.api.request({
            method: 'PUT',
            url: path,
            responseType: 'json',
            data: payload,
            params: parameters
        })
    }

    delete(path, payload) {
        return this.api.request({
            method: 'DELETE',
            url: path,
            responseType: 'json',
            data: payload
        })
    }
}

export default new Api;
