import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-hasty-14d18.cloudfunctions.net/'
});

export function getProductsByAddress(...args) {
    return instance.post('getProductsByAddress', ...args);
}

export function addStripeCustomerSource(source) {
    return instance.post('addStripeCustomerSource', source);
}

export function removeStripeCustomerSource(source) {
    return instance.post('removeStripeCustomerSource', source);
}

export function chargeStripeCustomerSource(charge) {
    return instance.post('chargeStripeCustomerSource', charge);
}

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
