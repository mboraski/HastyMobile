

// bc JSX uses react.createElement etc, we need react in this file
import React, { Component } from 'react';
import { ScrollView } from 'react-native'; // need for scrolling
import { StyleSheet, Text, View, Alert, TextInput, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

// import axios from 'axios';
// import AlbumDetail from './AlbumDetail';
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
      value={'Search Bah'}
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

  render() {
    // console.log(this.state);

    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.image}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
        <ScrollView horizontal={true}>
          <TouchableOpacity onPress={this._onPressForYou}>
            <Text>For You</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressInstant}>
            <Text>Instant</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressAll}>
            <Text>All</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
// {this.renderProducts()}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 20,
    width: null,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  horizontalScrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterButtons: {
    opacity: 0.38,
    border: '4 solid #000000',
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 10
  }
})

export default Home;
