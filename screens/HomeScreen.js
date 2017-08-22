// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import ProductList from '../components/ProductList';
import { addToCart } from '../actions';

class Home extends Component {
  onPressForYou() {
    console.log('For You');
  }

  onPressInstant() {
    console.log('Instant');
  }

  onPressAll() {
    console.log('All');
  }

  callAddToCart = () => {
    console.log('callAddToCart ran', this.props.cart);
    this.props.navigation.navigate('searchForHero');
    this.props.addToCart(this.props.cart);
  }

  render() {
    // console.log(this.state);

    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
        />
        <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}>
          <TouchableOpacity style={styles.filterButtons} onPress={this.onPressForYou}>
            <Text style={styles.filterButtonText}>For You</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButtons} onPress={this.onPressInstant}>
            <Text style={styles.filterButtonText}>Instant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButtons} onPress={this.onPressAll}>
            <Text style={styles.filterButtonText}>All</Text>
          </TouchableOpacity>
        </ScrollView>
        <ProductList callAddToCart={this.callAddToCart} />
      </View>
    );
  }
}
// {this.renderProducts()}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    flex: 1,
    minHeight: 90,
    width: null,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  horizontalScrollView: {
    flex: 1,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  filterButtons: {
    opacity: 0.38,
    width: 100,
    borderColor: '#000000',
    borderWidth: 4,
    borderStyle: 'solid',
    borderRadius: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterButtonText: {
    color: '#000000',
    fontSize: 18
  }
});

export default connect(null, { addToCart })(Home);
