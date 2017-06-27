// bc JSX uses react.createElement etc, we need react in this file
import React, { Component } from 'react';
import { ScrollView } from 'react-native'; // need for scrolling
import { StyleSheet, Text, View, Alert, TextInput, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

// import axios from 'axios';
import ProductList from '../components/ProductList';
// import Menu from '../components/Menu';
// import CartScreen from './CartScreen';
// import SearchBar from '../components/common/SearchBar';

class Home extends Component {
  // This is a more recent way that state can be initialized in react
  // This gives our state and initial value
  // state = { albums: [] };
  static navigationOptions = {
    headerTitle: (<TextInput
      style={{height: 40}}
      onChangeText={(text) => {console.log(text)}}
      value={'Search Bar'}
    />),
    headerLeft: (<Icon name="menu" size={40} />),
    headerRight: (<Icon name="shopping-cart" size={40} />)
  }

  componentWillMount() {
    // fetch album data with http request
    // we use this life cycle method here so that if runs immediately
    // when this component is going to be mounted to screen
    // axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    //   .then(response => this.setState({ albums: response.data }));
  }

  // renderProducts() {
  //   // whenever we render a list of components, we need to add a key property
  //   // react uses this for performance reasons
  //   return this.state.albums.map(album =>
  //     <AlbumDetail key={album.title} album={album} />
  //   );
  // }
  _onPressForYou() {
    console.log('For You');
  }

  _onPressInstant() {
    console.log('Instant');
  }

  _onPressAll() {
    console.log('All');
  }

  renderProducts

  render() {
    // console.log(this.state);

    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
        <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScrollView}>
          <TouchableOpacity style={styles.filterButtons} onPress={this._onPressForYou}>
            <Text style={styles.filterButtonText}>For You</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButtons} onPress={this._onPressInstant}>
            <Text style={styles.filterButtonText}>Instant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButtons} onPress={this._onPressAll}>
            <Text style={styles.filterButtonText}>All</Text>
          </TouchableOpacity>
        </ScrollView>
        <ProductList />
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
})

export default Home;
