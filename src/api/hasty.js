import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-hasty-14d18.cloudfunctions.net/'
});

export function getProductsByAddress(...args) {
    return instance.post('getProductsByAddress', ...args);
}

// export function deleteUser(...args) {
//     return instance.post('deleteUser', ...args);
// }

export function addCard(...args) {
    return new Promise(resolve => setTimeout(resolve, 3000));
}

export function deleteCard(...args) {
    return new Promise(resolve => setTimeout(resolve, 3000));
}

export function listCards(...args) {
    return new Promise(resolve => setTimeout(resolve, 3000));
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
