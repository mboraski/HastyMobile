// Third Party Imports
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import HeroDetail from './HeroDetail';

class HeroList extends Component {
    // heroes: [
    //     {
    //         id: 1,
    //         name: 'Jessica Morgan',
    //         type: 'Instant',
    //         delivery_time: 4,
    //         image: 'https://facebook.github.io/react/img/logo_og.png'
    //     },
    //     {
    //         id: 2,
    //         name: 'Matt Littlefield',
    //         type: 'Fast',
    //         delivery_time: 16,
    //         image: 'https://facebook.github.io/react/img/logo_og.png'
    //     }
    // ],

    render() {
        const { hero } = this.props;
        let result;
        console.log('hero: ', hero);
        if (hero) {
            result = (
                <View style={styles.container}>
                    <HeroDetail
                        hero={hero}
                    />
                </View>
            );
        } else {
            result = null;
        }
        return result;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

const mapStateToProps = state => ({
    hero: state.order.hero
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeroList);
