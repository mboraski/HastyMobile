// 3rd Party Libraries
import React from 'react';
import { reduxForm } from 'redux-form';

// Relative Imports
import CloseButton from '../components/CloseButton';
import InformationSummary from '../components/InformationSummary';
import Style from '../constants/Style';


const DeliveryDetailScreen = reduxForm({
    form: 'deliveryDetail'
})(InformationSummary);

DeliveryDetailScreen.navigationOptions = {
    title: 'Payment Details',
    headerLeft: <CloseButton />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
};

export default DeliveryDetailScreen;
