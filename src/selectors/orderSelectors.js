import { createSelector } from 'reselect';

export const getOrder = state => state.order.order;
export const getPending = state => state.order.pending;
export const getStatus = state => state.order.status;
export const getHero = state => state.order.hero;
export const getContactorIds = state => state.order.contactorIds;

export const getOrderId = createSelector([getOrder], order => order.id);
