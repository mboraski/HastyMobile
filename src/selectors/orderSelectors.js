import { createSelector } from 'reselect';
import map from 'lodash.map';

export const getOrder = state => state.order.order;
export const getOrderId = state => state.order.orderId;
export const getPending = state => state.order.pending;
export const getStatus = state => state.order.status;
export const getContactorIds = state => state.order.contactorIds;
export const getChatModalVisible = state => state.order.chatModalVisible;
export const getChatId = state => state.order.chatId;
export const getNewMessageValue = state => state.order.newMessageValue;
export const getChatPending = state => state.order.chatPending;

export const getFullActualFulfillment = createSelector(
    [getOrder],
    order => order.full || {}
);

export const getPartialActualFulfillment = createSelector(
    [getOrder],
    order => order.partial || {}
);

export const getContractorName = createSelector(
    [getFullActualFulfillment],
    full => {
        const contractors = map(full, contractor => {
            return `${contractor.firstName} ${contractor.lastName}`;
        });
        return contractors[0];
    }
);

export const getContractorStatus = createSelector(
    [getFullActualFulfillment],
    full => {
        const contractorStatuses = map(full, contractor => {
            return contractor.status;
        });
        return contractorStatuses[0];
    }
);

export const getMessageList = createSelector(
    [getFullActualFulfillment, getChatId],
    (fullOrder, chatId) => {
        const specificChat = fullOrder[chatId];
        if (specificChat) {
            return specificChat.chat || {};
        }
    }
);
