import _ from 'lodash';
import firebase from '../firebase';
import { updateCart } from './cartActions';

export const SELECT_CATEGORY = 'select_category';
export const FETCH_PRODUCTS_REQUEST = 'fetch_products_request';
export const FETCH_PRODUCTS_SUCCESS = 'fetch_products_success';
export const FETCH_PRODUCTS_FAILURE = 'fetch_products_failure';
export const SET_IMAGE = 'set_image';

export const fetchProductsRequest = () =>
    async (dispatch) => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });
        return await firebase.database().ref('products/US/TX/Austin')
            .on('value', (snapshot) => {
                const products = snapshot.val();
                dispatch(fetchProductsSuccess(products));
                dispatch(fetchProductImages(products, dispatch));
                dispatch(updateCart(products));
            });
    };
    // TODO: remove reference listener

export const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
});

export const selectCategory = category => ({
    type: SELECT_CATEGORY,
    payload: category
});

export const fetchProductImages = (products, dispatch) =>
    async () => {
        const storageRef = firebase.storage();
        // this.productImage = 'gs://hasty-14d18.appspot.com/productImages/advil-packet.jpg'
        console.log('products: ', products);
        _.forEach(products.instant, (product) => {
            console.log('fetchProductImages product: ', product);
            console.log('fetchProductImages product.imageUrl: ', product.imageUrl);
            const imageUrl = product.imageUrl || '';
            const imageRef = storageRef.refFromURL(imageUrl);
            imageRef.getDownloadURL()
                .then((url) => {
                    dispatch({
                        type: SET_IMAGE,
                        payload: { productName: product.productName, url }
                    });
                })
                .catch((error) => {
                    console.log('getDownloadUrl error: ', error);
                    dispatch({
                        type: SET_IMAGE,
                        payload: { productName: product.productName, url: '' }
                    });
                });
            });
        };
