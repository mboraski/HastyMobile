// 3rd Party Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { getUser, getPending } from '../selectors/authSelectors';
import Color from '../constants/Color';
import { statusBarOnly } from '../constants/Style';
import logoHeader from '../assets/LogoWithIconOrangeWithWhiteBackground.png';

class LoadingScreen extends Component {
    static propTypes = {
        // user: PropTypes.oneOfType([null, PropTypes.shape({})]).isRequired,
        pending: PropTypes.bool.isRequired
    };
    static navigationOptions = statusBarOnly;
    componentDidMount() {
        console.log('loading screen did mount');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoHeaderWrapper}>
                    <Image style={styles.logoHeader} source={logoHeader} />
                </View>
                <ActivityIndicator
                    animating
                    size="large"
                    color={Color.DEFAULT}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    logoHeaderWrapper: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoHeader: {
        width: 223,
        height: 40
    }
});

const mapStateToProps = state => ({
    user: getUser(state),
    pending: getPending(state)
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingScreen);
