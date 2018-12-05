import filter from 'lodash.filter';
import forEach from 'lodash.foreach';

import { setSalesTaxRate, setServiceFee } from './checkoutActions';
import { updateCart } from './cartActions';
import { createCart, updateCartImageUrls } from './utils/cartActionUtils';
import { rtdb, fire, db } from '../../firebase';

export const FETCH_PRODUCTS_REQUEST = 'fetch_products_request';
export const FETCH_PRODUCTS_SUCCESS = 'fetch_products_success';
export const FETCH_PRODUCTS_ERROR = 'fetch_products_error';
export const SELECT_CATEGORY = 'select_category';
export const FETCH_CUSTOMER_BLOCK_REQUEST = 'fetch_customer_block_request';
export const FETCH_CUSTOMER_BLOCK_SUCCESS = 'fetch_customer_block_success';
export const FETCH_CUSTOMER_BLOCK_ERROR = 'fetch_customer_block_error';
export const SET_IMAGE = 'set_image';

const CUSTOMER_BLOCK_PRODUCTS_REF = 'activeProducts/US/TX/Austin/products';

export const fetchProducts = () => async dispatch => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const querySnapshot = await db.collection('consumerProducts').get();
        // creates cart
        const cart = createCart(querySnapshot);
        console.log('created cart: ', cart);
        // adds imageUrls to cart object
        const cartWithImageUrls = await updateCartImageUrls(cart);
        console.log('created cartWithImageUrls: ', cartWithImageUrls);

        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: cartWithImageUrls });
    } catch (error) {
        console.log('fetch products error: ', error);
        dispatch({ type: FETCH_PRODUCTS_ERROR });
    }
};

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
            const { salesTaxRate, serviceFee } = data;
            dispatch(fetchProductImages(filteredProducts, dispatch));
            dispatch(fetchProductsSuccess(filteredProducts));
            dispatch(updateCart(filteredProducts));
            dispatch(setSalesTaxRate(salesTaxRate));
            dispatch(setServiceFee(serviceFee));
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
