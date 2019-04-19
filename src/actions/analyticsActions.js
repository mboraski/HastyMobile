import { rtdb, firebaseAuth } from '../../firebase';

const ANALYTICS_UNAUTH_SCREEN_VIEW_REF = 'analytics/unauthScreenView';
const ANALYTICS_SCREEN_VIEW_REF = 'analytics/screenView';
const ANALYTICS_PRODUCT_CLICK_REF = 'analytics/productClick';
const ANALYTICS_CATEGORY_CLICK_REF = 'analytics/categoryClick';
const ANALYTICS_LOCATION_SET_REF = 'analytics/locationSet';
const ANALYTICS_LIGHT_BEACON_CLICK_REF = 'analytics/lightBeaconClick';

export const logUnauthScreenView = (screen, timestamp) => () => {
    const ref = rtdb.ref(`${ANALYTICS_UNAUTH_SCREEN_VIEW_REF}`);
    const newEvent = ref.push();
    return newEvent.set({ screen, timestamp });
};

export const logScreenView = (screen, timestamp) => () => {
    if (firebaseAuth.currentUser) {
        const uid = firebaseAuth.currentUser.uid;
        const ref = rtdb.ref(`${ANALYTICS_SCREEN_VIEW_REF}/${uid}`);
        const newEvent = ref.push();
        return newEvent.set({ screen, timestamp });
    }
};

export const logProductClick = (product, timestamp) => {
    if (firebaseAuth.currentUser) {
        const uid = firebaseAuth.currentUser.uid;
        const ref = rtdb.ref(`${ANALYTICS_PRODUCT_CLICK_REF}/${uid}`);
        const newEvent = ref.push();
        return newEvent.set({ product, timestamp });
    }
};

export const logCategoryClick = (category, timestamp) => () => {
    if (firebaseAuth.currentUser) {
        const uid = firebaseAuth.currentUser.uid;
        const ref = rtdb.ref(`${ANALYTICS_CATEGORY_CLICK_REF}/${uid}`);
        const newEvent = ref.push();
        return newEvent.set({ category, timestamp });
    }
};

export const logLocationSet = (location, timestamp) => () => {
    if (firebaseAuth.currentUser) {
        const uid = firebaseAuth.currentUser.uid;
        const ref = rtdb.ref(`${ANALYTICS_LOCATION_SET_REF}/${uid}`);
        const newEvent = ref.push();
        return newEvent.set({ location, timestamp });
    }
};

export const logLightBeaconClick = (cart, timestamp) => () => {
    if (firebaseAuth.currentUser) {
        const uid = firebaseAuth.currentUser.uid;
        const ref = rtdb.ref(`${ANALYTICS_LIGHT_BEACON_CLICK_REF}/${uid}`);
        const newEvent = ref.push();
        return newEvent.set({ cart, timestamp });
    }
};
