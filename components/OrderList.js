// Third Party Imports
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import _ from 'lodash';

// Relative Imports
import OrderDetail from './OrderDetail';

class OrderList extends Component {
    renderOrders() {
        return _.map(this.props.orders, order => (
            <OrderDetail
                key={order.id}
                order={order}
                onAddOrder={() => this.props.onAddOrder(order)}
                onRemoveOrder={() => this.props.onRemoveOrder(order)}
            />
        ));
    }

    render() {
        return <ScrollView>{this.renderOrders()}</ScrollView>;
    }
}

export default OrderList;
