import { createSelector } from 'reselect';

export const getOrder = state => state.order.order;
export const getOrderId = state => state.order.orderId;
export const getPending = state => state.order.pending;
export const getStatus = state => state.order.status;
export const getContactorIds = state => state.order.contactorIds;

export const getFullActualFulfillment = createSelector(
    [getOrder],
    order => order.full || {}
);

export const getPartialActualFulfillment = createSelector(
    [getOrder],
    order => order.partial || {}
);
