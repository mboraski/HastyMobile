import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;
export const getPending = state => state.auth.pending;
export const getError = state => state.auth.error;
export const getExpirationDate = state => state.auth.expirationDate;
export const getUserReadable = state => state.auth.userReadable;

export const getFacebookInfo = createSelector(
    getUser,
    user =>
        user &&
        user.providerData.find(data => data.providerId === 'facebook.com')
);
