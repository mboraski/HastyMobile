import React, { Component } from 'react';
import { ScrollView } from 'react-native';
// import axios from 'axios';
import ProductDetail from './ProductDetail';

class ProductList extends Component {
  state = {
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
  };

  componentWillMount() {
    // fetch album data with http request
    // we use this life cycle method here so that if runs immediately
    // when this component is going to be mounted to screen
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
      .then(response => this.setState({ products: response.data }));
  }

  renderProducts() {
    // TODO: change key to some other id
    return this.state.products.map(product =>
      <ProductDetail key={product.title} product={product} />
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

export default ProductList;
