import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { connect } from 'react-redux';

import { placesAutocomplete } from '../actions/googleMapsActions';
import { toggleSearch } from '../actions/uiActions';
import { homeSearchChange } from '../actions/homeSearchActions';
import DebounceTextInput from '../components/DebounceTextInput';
import BackButton from '../components/BackButton';
import CloseButton from '../components/CloseButton';
import SearchBar from '../components/SearchBar';
import CartButton from '../components/CartButton';
import MenuButton from '../components/MenuButton';
import Style from '../constants/Style';
import { emY } from '../utils/em';

import searchIcon from '../assets/icons/search.png';

const OPACITY_DURATION = 300;
const APPBAR_HEIGHT = emY(5.95);
const REVERSE_CONFIG = {
    inputRange: [0, 1],
    outputRange: [1, 0]
};
const SIZE = emY(1.5);

type Props = {
    navigation: any,
}

class HomeHeader extends Component {
    state = {
        opacity: new Animated.Value(1),
        inputText: '',
        searchRendered: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.searchVisible !== nextProps.searchVisible) {
            this.animate(nextProps.searchVisible);
        }
    }
    
    props: Props;

    animate = searchVisible => {
        if (this.state.searchRendered) {
            this.afterSetState(searchVisible);
        } else {
            this.setState({ searchRendered: searchVisible }, () =>
                this.afterSetState(searchVisible)
            );
        }
    };

    afterSetState = searchVisible => {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: searchVisible ? 0 : 1,
                duration: OPACITY_DURATION
            })
        ]).start(() => {
            this.setState({
                searchRendered: searchVisible
            });
            if (searchVisible) {
                this.input.component.focus();
            }
        });
    };

    placesAutocomplete = text => {
        this.props.placesAutocomplete(text);
    };

    closeSearch = () => {
        this.props.toggleSearch();
    };

    clearSearch = () => {
        this.setState({
            inputText: ''
        });
        this.props.homeSearchChange('');
    };

    handleInput = inputText => {
        this.setState({
            inputText
        });
        this.props.homeSearchChange(inputText);
    };

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.wrapper}>
                <Animated.View
                    style={[Style.header, styles.header, { opacity: this.state.opacity }]}
                >
                    <View style={Style.appBar}>
                        <View style={Style.headerLeftContainer}>
                            <MenuButton style={Style.headerLeft} />
                        </View>
                        <View style={Style.headerTitleContainer}>
                            <SearchBar onFocus={() => this.closeSearch()} />
                        </View>
                        <View style={Style.headerRightContainer}>
                            <CartButton style={Style.headerRight} navigation={navigation} />
                        </View>
                    </View>
                </Animated.View>
                {this.state.searchRendered ? (
                    <Animated.View
                        style={[
                            Style.header,
                            styles.header,
                            { opacity: this.state.opacity.interpolate(REVERSE_CONFIG) }
                        ]}
                    >
                        <View style={Style.appBar}>
                            <View style={Style.headerLeftContainer}>
                                <BackButton style={Style.headerLeft} onPress={this.closeSearch} />
                            </View>
                            <DebounceTextInput
                                ref={c => (this.input = c)}
                                style={Style.headerTitleContainer}
                                placeholder="Search Products"
                                onDebounce={this.placesAutocomplete}
                                value={this.state.inputText}
                                onChangeText={this.handleInput}
                            />
                            <View style={Style.headerRightContainer}>
                                <CloseButton style={Style.headerRight} onPress={this.clearSearch} />
                            </View>
                        </View>
                    </Animated.View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
        height: APPBAR_HEIGHT
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: APPBAR_HEIGHT
    },
    title: {
        flex: 1
    },

    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE
    }
});

const mapStateToProps = state => ({
    searchVisible: state.ui.searchVisible
});

const mapDispatchToProps = dispatch => ({
    placesAutocomplete: text => dispatch(placesAutocomplete(text)),
    toggleSearch: () => dispatch(toggleSearch()),
    homeSearchChange: (text) => dispatch(homeSearchChange(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
