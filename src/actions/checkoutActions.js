export const SET_DELIVERY_NOTES = 'SET_DELIVERY_NOTES';
export const SET_SALES_TAX_RATE = 'set_sales_tax_rate';
export const SET_SERVICE_FEE = 'set_service_fee';

export const setDeliveryNotes = notes => ({
    type: SET_DELIVERY_NOTES,
    payload: notes
});

export const setSalesTaxRate = salesTaxRate => ({
    type: SET_SALES_TAX_RATE,
    payload: salesTaxRate
});

export const setServiceFee = serviceFee => ({
    type: SET_SERVICE_FEE,
    payload: serviceFee
});
