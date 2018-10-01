import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://us-central1-hasty-14d18.cloudfunctions.net/'
});
// const instance = axios.create({
//     baseURL: 'http://localhost:5000/hasty-14d18/us-central1/'
// });

export function addStripeCustomerSource(args) {
    return instance.post('addStripeCustomerSource', args);
}

export function removeStripeCustomerSource(args) {
    return instance.post('removeStripeCustomerSource', args);
}

export function chargeStripeCustomerSource(args) {
    return instance.post('chargeStripeCustomerSource', args);
}

export function logCustomerError(args) {
    return instance.post('logCustomerError', args);
}

function handleRequestConfig(config) {
    if (__DEV__) {
        // console.log(config);
    }
    return config;
}

function handleRequestError(error) {
    if (__DEV__) {
        // console.log(error);
    }
    return Promise.reject(error);
}

function handleResponseSuccess(config) {
    if (__DEV__) {
        // console.log(config);
    }
    return config;
}

function handleResponseError(error) {
    if (__DEV__) {
        // console.log(error);
    }
    return Promise.reject(error);
}

export const requestInterceptorId = instance.interceptors.request.use(
    handleRequestConfig,
    handleRequestError
);
export const responseInterceptorId = instance.interceptors.response.use(
    handleResponseSuccess,
    handleResponseError
);
