import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/'
});

export default {
    placesAutoComplete(...args) {
        return instance.get('place/autocomplete/json', ...args);
    }    
};

function handleRequestConfig(config) {
    if (__DEV__) {
        console.log(config);
    }
    return config;
}

function handleRequestError(error) {
    if (__DEV__) {
        console.log(error);
    }
    return Promise.reject(error);
}

function handleResponseSuccess(config) {
    if (__DEV__) {
        console.log(config);
    }
    return config;
}

function handleResponseError(error) {
    if (__DEV__) {
        console.log(error);
    }
    return Promise.reject(error);
}

instance.interceptors.request.use(handleRequestConfig, handleRequestError);
instance.interceptors.response.use(handleResponseSuccess, handleResponseError);
