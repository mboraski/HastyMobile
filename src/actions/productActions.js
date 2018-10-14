import filter from 'lodash.filter';
import forEach from 'lodash.foreach';

import { noHeroesAvailable } from './mapActions';
import { updateCart } from './cartActions';
import { setContractors } from './orderActions';
import { rtdb, fire } from '../../firebase';

export const SELECT_CATEGORY = 'select_category';
export const FETCH_PRODUCTS_REQUEST = 'fetch_products_request';
export const FETCH_PRODUCTS_SUCCESS = 'fetch_products_success';
export const FETCH_PRODUCTS_FAILURE = 'fetch_products_failure';
export const SET_IMAGE = 'set_image';

const PRODUCTS_REF = 'activeProducts/US/TX/Austin';

export const fetchProductsRequest = () => dispatch => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    return listenProductsRef(dispatch);
};

export const listenProductsRef = dispatch =>
    rtdb.ref(PRODUCTS_REF).on(
        'value',
        snapshot => {
            const data = snapshot.val();
            // for some reason firebase has empty hashed database objects, this filters them
            // TODO: figure out why firebase did this
            const filteredProducts = {};
            filteredProducts.instant = filter(
                data.instant,
                product => !!product
            );
            if (Object.keys(filteredProducts.instant).length < 1) {
                dispatch(
                    noHeroesAvailable({
                        code: '007',
                        message: 'No Heroes Available'
                    })
                );
            } else {
                dispatch(fetchProductsSuccess(filteredProducts));
                dispatch(fetchProductImages(filteredProducts, dispatch));
                dispatch(updateCart(filteredProducts));
                dispatch(setContractors(data.contractors));
            }
        },
        error => dispatch(fetchProductsFailure(error))
    );

export const unListenProductsRef = () => rtdb.ref(PRODUCTS_REF).off();

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

export const fetchProductImages = (products, dispatch) => async () => {
    const storageRef = fire.storage();
    // this.productImage = 'gs://hasty-14d18.appspot.com/productImages/advil-packet.jpg'
    // console.log('products: ', products);
    forEach(products.instant, product => {
        const imageUrl = product.imageUrl || '';
        if (imageUrl) {
            const imageRef = storageRef.refFromURL(imageUrl);
            imageRef
                .getDownloadURL()
                .then(url => {
                    dispatch({
                        type: SET_IMAGE,
                        payload: { productName: product.productName, url }
                    });
                })
                .catch(error => {
                    // console.log('getDownloadUrl error: ', error);
                    dispatch({
                        type: SET_IMAGE,
                        payload: { productName: product.productName, url: '' }
                    });
                });
        } else {
            dispatch({
                type: SET_IMAGE,
                payload: { productName: product.productName, url: '' }
            });
        }
    });
};
