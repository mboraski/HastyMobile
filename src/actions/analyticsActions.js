import { rtdb, firebaseAuth } from '../../firebase';

const ANALYTICS_SCREEN_VIEW_REF = 'analytics/screenView';
const ANALYTICS_PRODUCT_CLICK_REF = 'analytics/productClick';
const ANALYTICS_CATEGORY_CLICK_REF = 'analytics/categoryClick';
const ANALYTICS_LOCATION_SET_REF = 'analytics/locationSet';

export const logScreenView = (screen, timestamp) => () => {
    console.log('logScreenView screen: ', screen);
    const uid = firebaseAuth.currentUser.uid;
    const ref = rtdb.ref(`${ANALYTICS_SCREEN_VIEW_REF}/${uid}`);
    const newEvent = ref.push();
    return newEvent.set({ screen, timestamp });
};

export const logProductClick = (product, timestamp) => {
    console.log('logProductClick product: ', product);
    if (firebaseAuth.currentUser) {
        const uid = firebaseAuth.currentUser.uid;
        const ref = rtdb.ref(`${ANALYTICS_PRODUCT_CLICK_REF}/${uid}`);
        const newEvent = ref.push();
        return newEvent.set({ product, timestamp });
    }
};

export const logCategoryClick = (category, timestamp) => () => {
    console.log('logCategoryClick category: ', category);
    if (firebaseAuth.currentUser) {
        const uid = firebaseAuth.currentUser.uid;
        const ref = rtdb.ref(`${ANALYTICS_CATEGORY_CLICK_REF}/${uid}`);
        const newEvent = ref.push();
        return newEvent.set({ category, timestamp });
    }
};

export const logLocationSet = (location, timestamp) => () => {
    console.log('logLocationSet location: ', location);
    if (firebaseAuth.currentUser) {
        const uid = firebaseAuth.currentUser.uid;
        const ref = rtdb.ref(`${ANALYTICS_LOCATION_SET_REF}/${uid}`);
        const newEvent = ref.push();
        return newEvent.set({ location, timestamp });
    }
};
