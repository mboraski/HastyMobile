// Third Party Imports
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import ProductList from '../components/ProductList';
import MenuButton from '../components/MenuButton';
import CartButton from '../components/CartButton';
import SearchBar from '../components/SearchBar';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { addToCart } from '../actions';
import { emX, emY } from '../utils/em';

const SOURCE = { uri: 'https://source.unsplash.com/random/800x600' };

const FILTERS = ['For You', 'Food', 'Drinks'];

class HomeScreen extends Component {
    state = { filter: FILTERS[0] };

    onPressFilter(filter) {
        console.log(filter);
    }

    callAddToCart = () => {
        console.log('callAddToCart ran', this.props.cart);
        this.props.navigation.navigate('searchForHero');
        this.props.addToCart(this.props.cart);
    };

    renderFilter = filter => {
        const selectedFilter = this.state.filter === filter;
        const filterButtonSelected = selectedFilter ? styles.filterButtonSelected : null;
        const filterButtonTextSelected = selectedFilter ? styles.filterButtonTextSelected : null;
        return (
            <TouchableOpacity
                key={filter}
                style={[styles.filterButton, filterButtonSelected]}
                onPress={() => this.onPressFilter(filter)}
            >
                <Text style={[styles.filterButtonText, filterButtonTextSelected]}>
                    {filter}
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        // console.log(this.state);

        return (
            <View style={styles.container}>
                <Image source={SOURCE} style={styles.image}>
                    <View style={[StyleSheet.absoluteFill, styles.imageTint]} />
                    <Text style={styles.imageTitle}>Recommended</Text>
                    <Text style={styles.imageMeta}>215 items</Text>
                </Image>
                <ScrollView
                    horizontal
                    style={styles.filters}
                    contentContainerStyle={styles.filtersContent}
                >
                    {FILTERS.map(this.renderFilter)}
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
        backgroundColor: '#fff'
    },
    image: {
        height: emY(12.5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageTint: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: emY(1.875),
        textAlign: 'center'
    },
    imageMeta: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: emY(1),
        textAlign: 'center'
    },
    filters: {
        ...Platform.select({
            ios: {
                height: emY(6.25)
            },
            android: {
                height: emY(6.25) + 30
            }
        })
    },
    filtersContent: {
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterButton: {
        minWidth: 130,
        height: emY(2.6875),
        borderColor: Color.GREY_400,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: 50,
        paddingVertical: emY(0.75),
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterButtonSelected: {
        borderColor: Color.GREY_300,
        backgroundColor: Color.GREY_300
    },
    filterButtonText: {
        color: Color.GREY_400,
        fontSize: emY(1.125)
    },
    filterButtonTextSelected: {
        color: '#fff'
    }
});

HomeScreen.navigationOptions = {
    title: 'Hasty Logo',
    headerLeft: <MenuButton />,
    headerTitle: <SearchBar />,
    headerRight: <CartButton />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
};

export default connect(null, { addToCart })(HomeScreen);
