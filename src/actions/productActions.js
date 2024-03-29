import { Image } from 'react-native';
import { Constants } from 'expo';
import forEach from 'lodash.foreach';
import reduce from 'lodash.reduce';

import { rtdb, storage, db } from '../../firebase';
import { getConfig } from '../../config-utils';
import {
    setSalesTaxRate,
    setServiceFeeRate,
    setDeliveryFee
} from './checkoutActions';
import { updateCart, updateAvailableProducts } from './cartActions';
import { setProductsObserver, removeProductsObserver } from './observerActions';
import {
    getDocsFromCollection,
    getRefIdFromDoc,
    getDataFromDoc
} from '../utils/firebase_utils/firestoreUtils';
import { mutateProductsIntoCart } from './utils/productUtils';

export const SELECT_CATEGORY = 'select_category';
export const FETCH_PRODUCTS_REQUEST = 'fetch_products_request';
export const FETCH_PRODUCTS_SUCCESS = 'fetch_products_success';
export const FETCH_PRODUCTS_ERROR = 'fetch_products_error';
export const FETCH_CUSTOMER_BLOCK_REQUEST = 'fetch_customer_block_request';
export const FETCH_CUSTOMER_BLOCK_SUCCESS = 'fetch_customer_block_success';
export const FETCH_CUSTOMER_BLOCK_ERROR = 'fetch_customer_block_error';
export const SET_IMAGE = 'set_image';
export const EDIT_PRODUCT_SEARCH_TEXT = 'edit_product_search_text';

const CUSTOMER_BLOCK_PRODUCTS_REF = 'activeProducts/US/TX/Austin/products';
const TEST_STORAGE_REF = 'gs://hasty-test.appspot.com/product_images';
const PROD_STORAGE_REF = 'gs://hasty-14d18.appspot.com/product_images';
const PRODUCTS_REF = 'products';
const STORAGE_REF =
    getConfig(Constants.manifest.releaseChannel) === 'prod'
        ? PROD_STORAGE_REF
        : TEST_STORAGE_REF;

export const fetchCustomerBlock = dispatch => {
    // dispatch({ type: FETCH_CUSTOMER_BLOCK_REQUEST });
    return listenCustomerBlockRef(dispatch);
};

// Listen to product & hero availability details related to region set by consumer
export const listenCustomerBlockRef = dispatch =>
    rtdb.ref(CUSTOMER_BLOCK_PRODUCTS_REF).on(
        'value',
        snapshot => {
            const data = snapshot.val();
            const { salesTaxRate, serviceFeeRate, deliveryFee, instant } = data;
            dispatch(updateAvailableProducts(instant));
            dispatch(setSalesTaxRate(salesTaxRate));
            dispatch(setServiceFeeRate(serviceFeeRate));
            dispatch(setDeliveryFee(deliveryFee));
            dispatch(fetchCustomerBlockSuccess());
        },
        error => dispatch(fetchCustomerBlockError(error))
    );

export const unListenCustomerBlock = () =>
    rtdb.ref(CUSTOMER_BLOCK_PRODUCTS_REF).off();

export const fetchCustomerBlockSuccess = () => ({
    type: FETCH_CUSTOMER_BLOCK_SUCCESS
});

export const fetchCustomerBlockError = error => ({
    type: FETCH_CUSTOMER_BLOCK_ERROR,
    payload: error
});

// Fetches all products the company offers
export const listenProducts = async dispatch => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const productsObserver = await db
            .collection(PRODUCTS_REF)
            .onSnapshot(allProducts => {
                const docs = getDocsFromCollection(allProducts);
                const extractedData = reduce(
                    docs,
                    (accum, doc) => {
                        const id = getRefIdFromDoc(doc);
                        const data = getDataFromDoc(doc);
                        return Object.assign({}, accum, { [id]: data });
                    },
                    {}
                );
                const productIdList = Object.keys(extractedData);

                // start fetching and caching product images
                forEach(productIdList, productId => {
                    fetchProductImage(productId, dispatch);
                });

                // mutate the product objects into cart product objects
                const newCartProducts = mutateProductsIntoCart(extractedData);
                // send mutated products to be merged with current cart
                dispatch(updateCart(newCartProducts));
                // save a copy of the products fetched to the store
                dispatch(fetchProductsSuccess({ instant: extractedData }));
            });
        // dispatch this listener to store to unlisten when needed
        dispatch(setProductsObserver(productsObserver));
        return productsObserver;
    } catch (error) {
        return dispatch(fetchProductsError(error));
    }
};

export const unListenProducts = dispatch => {
    dispatch(removeProductsObserver());
};

export const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

export const fetchProductsError = error => ({
    type: FETCH_PRODUCTS_ERROR,
    payload: error
});

export const selectCategory = category => ({
    type: SELECT_CATEGORY,
    payload: category
});

export const fetchProductImage = async (productId, dispatch) => {
    // Create a reference to the file
    const ref = storage.refFromURL(`${STORAGE_REF}/${productId}.jpg`);

    // Get the download URL
    const url = await ref.getDownloadURL();

    // set image url in store
    dispatch({
        type: SET_IMAGE,
        payload: { productId, url }
    });
    // cache image
    Image.prefetch(`${url}`);
};

export const editSearchText = searchText => dispatch =>
    dispatch({
        type: EDIT_PRODUCT_SEARCH_TEXT,
        searchText
    });
