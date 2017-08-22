// Third Party Imports
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import _ from 'lodash';

// Relative Imports
import ProductDetail from './ProductDetail';


class ProductList extends Component {
  state = {
    products: []
  };

  componentWillMount() {
    // TODO: fetch available products once endpoint complete
    this.setState({
      products: [{
        title: 'Redbull',
        thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
        price: '$3.49'
      }, {
        title: 'Monster',
        thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
        price: '$3.49'
      }, {
        title: 'Gatorade',
        thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
        price: '$2.49'
      }, {
        title: 'Water',
        thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
        price: '$0.99'
      }]
    });
  }

  renderProducts() {
    // TODO: change key to some other id
    return _.map(this.state.products, product =>
      <ProductDetail
        key={product.title}
        product={product}
        callAddToCart={this.props.callAddToCart}
      />
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderProducts()}
      </ScrollView>
    );
  }
}

export default ProductList;
