import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { connect } from 'react-redux';

import { placesAutocomplete } from '../actions/googleMapsActions';
import { toggleSearch } from '../actions/uiActions';
import DebounceTextInput from '../components/DebounceTextInput';
import BackButton from '../components/BackButton';
import CloseButton from '../components/CloseButton';
import LocationButton from '../components/LocationButton';
import MenuButton from '../components/MenuButton';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const OPACITY_DURATION = 300;
const APPBAR_HEIGHT = emY(5.95);
const REVERSE_CONFIG = {
    inputRange: [0, 1],
    outputRange: [1, 0]
};

class MapHeader extends Component {
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
    };

    handleInput = inputText => {
        this.setState({
            inputText
        });
    };

    render() {
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
                            <Text style={Style.headerTitle}>Hasty Logo</Text>
                        </View>
                        <View style={Style.headerRightContainer}>
                            <LocationButton style={Style.headerRight} />
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
                                placeholder="Enter Address"
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
    }
});

const mapStateToProps = state => ({
    searchVisible: state.ui.searchVisible
});

const mapDispatchToProps = dispatch => ({
    placesAutocomplete: text => dispatch(placesAutocomplete(text)),
    toggleSearch: () => dispatch(toggleSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapHeader);
