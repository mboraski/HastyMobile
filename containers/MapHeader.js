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

class MapHeader extends Component {
    state = {
        opacity: new Animated.Value(1),
        searchOpacity: new Animated.Value(0)
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.searchVisible !== nextProps.searchVisible) {
            this.animate(nextProps.searchVisible);
        }
    }

    animate(searchVisible) {
        if (this.state.searchRendered) {
            this.afterSetState(searchVisible);
        } else {
            this.setState({ searchRendered: searchVisible }, () =>
                this.afterSetState(searchVisible)
            );
        }
    }

    afterSetState = searchVisible => {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: searchVisible ? 0 : 1,
                duration: OPACITY_DURATION
            }),
            Animated.timing(this.state.searchOpacity, {
                toValue: searchVisible ? 1 : 0,
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
        this.props.dispatch(placesAutocomplete(text));
    };

    closeSearch = () => {
        this.props.dispatch(toggleSearch());
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
                        style={[Style.header, styles.header, { opacity: this.state.searchOpacity }]}
                    >
                        <View style={Style.appBar}>
                            <View style={Style.headerLeftContainer}>
                                <BackButton style={Style.headerLeft} />
                            </View>
                            <DebounceTextInput
                                ref={c => (this.input = c)}
                                style={Style.headerTitleContainer}
                                placeholder="Enter Address"
                                onDebounce={this.placesAutocomplete}
                            />
                            <View style={Style.headerRightContainer}>
                                <CloseButton onPress={this.closeSearch} style={Style.headerRight} />
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

export default connect(mapStateToProps)(MapHeader);
