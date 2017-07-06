// 3rd Party Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import _ from 'lodash';
// import axios from 'axios';

// Relative Imports
import ProductDetail from './ProductDetail';


class ProductList extends Component {
  state = {
    products: []
  };

  componentWillMount() {
    // fetch album data with http request
    // we use this life cycle method here so that if runs immediately
    // when this component is going to be mounted to screen
    // axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    //   .then(response => this.setState({ products: response.data }));
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
    console.log(this.state);

    return (
      <ScrollView>
        {this.renderProducts()}
      </ScrollView>
    );
  }
}


// const mapStateToProps = (state) => {
//   return { name, phone, shift };
// };

export default ProductList;
