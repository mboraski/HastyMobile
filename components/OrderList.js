// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import _ from 'lodash';

// Relative Imports
import OrderDetail from './OrderDetail';

class OrderList extends Component {
    renderOrders() {
        return _.map(this.props.orders, order => (
            <OrderDetail
                key={`${order.deliveryType}-${order.productCode}`}
                order={order}
                onAddOrder={() => this.props.onAddOrder(order)}
                onRemoveOrder={() => this.props.onRemoveOrder(order)}
            />
        ));
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {this.renderOrders()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 200
    }
});

export default OrderList;
