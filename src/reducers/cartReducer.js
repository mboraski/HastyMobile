import _ from 'lodash';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SET_CURRENT_LOCATION,
    UPDATE_CART
} from '../actions/cartActions';

function normalizeCurrency(currency) {
    if (typeof currency === 'string') return Number(currency.replace(/[^0-9\.-]+/g, ''));
    return currency;
}

export const initialState = {
    products: {
        instant: {}
    },
    itemCountUp: false,
    itemCountDown: false,
    serviceFee: 0,
    deliveryFee: 0,
    localSalesTax: 0.0625,
    preTaxTotal: 0,
    tax: 0,
    total: 0,
    currentSetAddress: 'E 6th St & Congress Ave, Austin, TX 78701',
    currentSetLatLon: {
        lat: '30.268066',
        lon: '-97.7450017',
        latitudeDelta: '',
        longitudeDelta: ''
    }
};

const addProductToCart = (product, cartProducts) => {
    const cart = Object.assign({}, cartProducts);
    const cartItem = cart.instant[product.productName] || {};
    cartItem.quantityTaken += 1;
    console.log('add product now cart: ', cart);
    return cart;
};

const mutateProductsIntoCart = (newProducts) => {
    // for each product, set a new object in the cart object at key of productName
    const newInstantCart = {};
    _.forEach(newProducts.instant, (product) => {
        newInstantCart[product.productName] = {
            categories: product.categories,
            imageUrl: product.imageUrl,
            price: product.price,
            productName: product.productName,
            quantityAvailable: product.quantity,
            quantityTaken: 0
        };
    });
    return { instant: newInstantCart };
    // for each product, set a new object in the cart object at key of productName
    // const newFastCart = {};
    // _.forEach(newProducts.fast, (product) => {
    //     newFastCart[product.productName] = {
    //         categories: product.categories,
    //         imageUrl: product.imageUrl,
    //         price: product.price,
    //         productName: product.productName,
    //         quantityAvailable: product.quantity,
    //         quantityTaken: 0
    //     }
    // })
};

const mergeCarts = (newCart, oldCart) => {
    const netCart = { instant: {} };
    let itemCountUp = false;
    let itemCountDown = false;
    _.forEach(newCart.instant, (item) => {
        const oldItem = oldCart.instant[item.productName];
        if (oldItem) {
            // did the quantity available go down
            // did the quantity available go up
            const upOrDown = oldItem.quantityAvailable - item.quantityAvailable;
            let newQuantityTaken = 0;
            if (item.quantityAvailable < oldItem.quantityTaken) {
                newQuantityTaken = item.quantityAvailable;
            } else {
                newQuantityTaken = oldItem.quantityTaken;
            }
            if (upOrDown < 0) {
                itemCountUp = true;
            } else {
                itemCountDown = true;
                netCart.instant[oldItem.productName] = {
                    categories: oldItem.categories,
                    imageUrl: oldItem.imageUrl,
                    price: oldItem.price,
                    productName: oldItem.productName,
                    quantityAvailable: item.quantityAvailable,
                    quantityTaken: newQuantityTaken
                };
            }
        } else {
            itemCountUp = true;
            netCart.instant[item.productName] = item;
        }
    });
    return { netCart, itemCountUp, itemCountDown };
};

// const removeProductFromCart = (product, key, cartProducts) => {
//     let cartItem = cartProducts[key] || null;
//     if (!cartItem) {
//         cartItem = product;
//     } else {
//         cartItem.quantity = --cartItem.quantity;
//     }
//     return cartItem;
// };

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const product = action.payload;
            const preTaxTotal = Math.max(
                0,
                (state.preTaxTotal + normalizeCurrency(product.price)).toFixed(2)
            );
            const calculatedTax = (preTaxTotal * state.localSalesTax);
            const calculatedTotal = preTaxTotal + calculatedTax;
            const newCart = addProductToCart(product, state.products); // not forcing rerender?
            return {
                ...state,
                products: newCart,
                total: calculatedTotal,
                tax: calculatedTax,
                preTaxTotal
            };
        }
        case REMOVE_FROM_CART: {
            const product = action.payload;
            const preTaxTotal = Math.max(
                0,
                (state.preTaxTotal + normalizeCurrency(product.price)).toFixed(2)
            );
            const calculatedTax = (preTaxTotal * state.localSalesTax);
            const calculatedTotal = preTaxTotal + calculatedTax;
            return {
                ...state,
                products: addProductToCart(product, state.products),
                total: calculatedTotal,
                tax: calculatedTax,
                preTaxTotal
            };
        }
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentSetAddress: action.payload.address,
                currentSetLatLon: {
                    lat: action.payload.region.latitude,
                    lon: action.payload.region.longitude
                }
            };
        case UPDATE_CART: {
            const translate = mutateProductsIntoCart(action.payload);
            const merge = mergeCarts(translate, state.products);
            console.log('translate: ', translate);
            console.log('merge: ', merge);
            return {
                ...state,
                products: merge.netCart,
                itemCountUp: merge.itemCountUp,
                itemCountDown: merge.itemCountDown
            };
        }
        default:
            return state;
    }
};
