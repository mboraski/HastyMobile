import filter from 'lodash.filter';
import forEach from 'lodash.foreach';

import {
    setSalesTaxRate,
    setServiceFeeRate,
    setDeliveryFee
} from './checkoutActions';
import { updateCart } from './cartActions';
import { rtdb, fire } from '../../firebase';

export const SELECT_CATEGORY = 'select_category';
export const FETCH_CUSTOMER_BLOCK_REQUEST = 'fetch_customer_block_request';
export const FETCH_CUSTOMER_BLOCK_SUCCESS = 'fetch_customer_block_success';
export const FETCH_CUSTOMER_BLOCK_ERROR = 'fetch_customer_block_error';
export const SET_IMAGE = 'set_image';

const CUSTOMER_BLOCK_PRODUCTS_REF = 'activeProducts/US/TX/Austin/products';

export const fetchCustomerBlock = dispatch => {
    dispatch({ type: FETCH_CUSTOMER_BLOCK_REQUEST });
    return listenCustomerBlockRef(dispatch);
};

export const listenCustomerBlockRef = dispatch =>
    rtdb.ref(CUSTOMER_BLOCK_PRODUCTS_REF).on(
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
            const { salesTaxRate, serviceFeeRate, deliveryFee } = data;
            dispatch(fetchProductImages(filteredProducts, dispatch));
            dispatch(fetchProductsSuccess(filteredProducts));
            dispatch(updateCart(filteredProducts));
            dispatch(setSalesTaxRate(salesTaxRate));
            dispatch(setServiceFeeRate(serviceFeeRate));
            dispatch(setDeliveryFee(deliveryFee));
        },
        error => dispatch(fetchProductsFailure(error))
    );

export const unListenCustomerBlock = () =>
    rtdb.ref(CUSTOMER_BLOCK_PRODUCTS_REF).off();

export const fetchProductsSuccess = products => ({
    type: FETCH_CUSTOMER_BLOCK_SUCCESS,
    payload: products
});

export const fetchProductsFailure = error => ({
    type: FETCH_CUSTOMER_BLOCK_ERROR,
    payload: error
});

export const selectCategory = category => ({
    type: SELECT_CATEGORY,
    payload: category
});

export const fetchProductImages = (products, dispatch) => async () => {
    const storageRef = fire.storage();
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
                .catch(() => {
                    // TODO: use placeholder image if error, not empty string
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
