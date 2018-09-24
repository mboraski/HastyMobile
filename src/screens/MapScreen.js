// Third Party Imports
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Platform,
    Animated,
    ActivityIndicator
} from 'react-native';
import { MapView, Constants } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import debounce from 'lodash.debounce';
import { ref } from '../../firebase';

// Relative Imports
import {
    saveAddress,
    setRegion,
    getCurrentLocation
} from '../actions/mapActions';
import { setCurrentLocation } from '../actions/cartActions';
import { distanceMatrix, reverseGeocode } from '../actions/googleMapsActions';
import { toggleSearch, dropdownAlert } from '../actions/uiActions';
import {
    orderCreationSuccess,
    orderCreationFailure
} from '../actions/orderActions';
import { getUserReadable } from '../actions/authActions';

import { getProductsPending } from '../selectors/productSelectors';
import { getSearchVisible } from '../selectors/uiSelectors';
import {
    getPredictions,
    getRegion,
    getAddress,
    getError
} from '../selectors/mapSelectors';

import ContinuePopup from '../components/ContinuePopup';
import SuccessPopup from '../components/SuccessPopup';
import PredictionList from '../components/PredictionList';
import Text from '../components/Text';

import MapHeaderContainer from '../containers/MapHeaderContainer';

import Color from '../constants/Color';
import { emY } from '../utils/em';
// TODO: how accurate is the center of the bottom point of the beacon?
import beaconIcon from '../assets/icons/beacon.png';

const NO_HERO_FOUND = `It does not look like there is a Hero available in you area.`;
// TODO: allow users to just click a button to ask for service in a particular area.
// Make sure to rate limit by account or something, so it isn't abused

const OPACITY_DURATION = 300;
const REVERSE_CONFIG = {
    inputRange: [0, 1],
    outputRange: [1, 0]
};
const ANCHOR = {
    x: 0.2,
    y: 1
};
const CENTER_OFFSET = {
    x: 12,
    y: -55 / 2
};
const MARKER_ANIMATION_DURATION = 0;

const CHANGE_LOCATION_TITLE =
    'Are you sure you want to change your delivery location?';
const CHANGE_LOCATION_MESSAGE =
    'The available products/services at your new location may be different.';

class MapScreen extends Component {
    state = {
        mapReady: false,
        address: '',
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
        searchRendered: false,
        getCurrentPositionPending: false,
        initialMessageVisible: false,
        animatedRegion: new MapView.AnimatedRegion(this.props.region),
        changeLocationPopupVisible: false
    };

    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.props.dropdownAlert(
                true,
                'Oops, this will only work on a device'
            );
        } else if (!this.props.region) {
            this.props.getCurrentLocation();
        }
        this.props.getUserReadable();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.searchVisible !== nextProps.searchVisible) {
            this.animate(nextProps.searchVisible);
        }
        if (this.props.header.toggleState !== nextProps.header.toggleState) {
            if (nextProps.header.isMenuOpen) {
                this.props.navigation.navigate('DrawerOpen');
            } else {
                this.props.navigation.navigate('DrawerClose');
            }
        }
        if (this.props.region !== nextProps.region) {
            this.animateMarkerToCoordinate(nextProps.region);
        }
    }

    onMapReady = () => {
        this.setState({ mapReady: true });
    };

    onRegionChangeComplete = async region => {
        if (this.state.mapReady) {
            this.props.setRegion(region);
            this.getAddress({
                latlng: `${region.latitude},${region.longitude}`
            });
        }
    };

    getAddress = debounce(this.props.reverseGeocode, 1000, {
        leading: false,
        tailing: true
    });

    useCurrentLocationPress = () => {
        this.setState({ changeLocationPopupVisible: true });
    };

    changeLocationConfirmed = async confirmed => {
        // close change location warning modal
        this.setState({ changeLocationPopupVisible: false });

        // if the user click 'Apply', continue with use current location
        if (confirmed) {
            let resp;
            const result = await this.props.distanceMatrix({
                units: 'imperial',
                origins: '30.268066,-97.7450017', // 'E 6th St & Congress Ave, Austin, TX 78701'
                destinations: `${this.props.region.latitude},${
                    this.props.region.longitude
                }`
            });
            if (result.rows[0].elements[0].duration.value > 60 * 30) {
                this.props.dropdownAlert(true, NO_HERO_FOUND);
                resp = result;
            } else {
                this.props.dropdownAlert(false, '');
                this.props.setCurrentLocation(
                    this.props.address,
                    this.props.region
                );
                try {
                    resp = await ref('orders/US/TX/Austin').push({
                        currentSetAddress: this.props.address,
                        region: this.props.region,
                        status: 'open'
                    });
                    if (resp) {
                        const key = resp.path.pieces_.join('/'); // eslint-disable-line
                        this.props.orderCreationSuccess(key);
                        this.props.navigation.navigate('home');
                    } else {
                        throw new Error('Error setting location');
                    }
                } catch (error) {
                    resp = error;
                    const message =
                        error.message || // just while dev TODO: remove
                        'Error setting location, please change and try again';

                    this.props.orderCreationFailure(error); // TODO: log this error to server
                    this.props.dropdownAlert(true, message);
                }
            }
            return resp;
        }
    };

    animateMarkerToCoordinate = coordinate => {
        if (Platform.OS === 'android') {
            if (this.marker) {
                /* eslint-disable no-underscore-dangle */
                this.marker._component.animateMarkerToCoordinate(
                    /* eslint-enable no-underscore-dangle */
                    coordinate,
                    MARKER_ANIMATION_DURATION
                );
            }
        } else {
            this.state.animatedRegion
                .timing({
                    ...coordinate,
                    duration: MARKER_ANIMATION_DURATION
                })
                .start();
        }
    };

    handleRegionChange = region => {
        if (this.state.mapReady) {
            this.animateMarkerToCoordinate(region);
        }
    };

    handleAddress = address => {
        this.setState({ address });
    };

    handleAddressFocus = () => {
        this.props.dropdownAlert(false, '');
        this.props.toggleSearch();
    };

    selectPrediction = prediction => {
        this.props.saveAddress(prediction.description);
        this.props.toggleSearch();
    };

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
            Animated.timing(this.state.translateY, {
                toValue: searchVisible ? -100 : 0,
                duration: OPACITY_DURATION
            }),
            Animated.timing(this.state.opacity, {
                toValue: searchVisible ? 0 : 1,
                duration: OPACITY_DURATION
            })
        ]).start(() => {
            this.setState({
                searchRendered: searchVisible
            });
        });
    };

    handleInitialMessageClose = () => {
        this.setState({ initialMessageVisible: false });
    };

    render() {
        const {
            predictions,
            region,
            address,
            pending,
            productPending
        } = this.props;

        const { changeLocationPopupVisible } = this.state;

        return (
            <View style={styles.container}>
                <MapView
                    region={region}
                    style={styles.map}
                    onMapReady={this.onMapReady}
                    onRegionChange={this.handleRegionChange}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                >
                    <MapView.Marker.Animated
                        ref={marker => {
                            this.marker = marker;
                        }}
                        image={beaconIcon}
                        coordinate={this.state.animatedRegion}
                        title="You"
                        description="Your Delivery Location"
                        anchor={ANCHOR}
                        centerOffset={CENTER_OFFSET}
                        style={styles.beaconMarker}
                    />
                </MapView>
                <TouchableWithoutFeedback
                    onPress={this.handleAddressFocus}
                    disabled={pending}
                >
                    <Animated.View
                        style={[
                            styles.inputContainer,
                            { zIndex: 2 },
                            {
                                opacity: this.state.opacity,
                                transform: [
                                    { translateY: this.state.translateY }
                                ]
                            }
                        ]}
                    >
                        <Text style={styles.inputLabel}>To</Text>
                        <Text style={styles.inputValue}>{address}</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[
                        styles.buttonContainer,
                        {
                            opacity: this.state.opacity
                        }
                    ]}
                >
                    <Button
                        large
                        title="Use Current Location"
                        onPress={this.useCurrentLocationPress}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        disabled={pending}
                    />
                </Animated.View>
                {this.state.searchRendered ? (
                    <PredictionList
                        predictions={predictions}
                        selectPrediction={this.selectPrediction}
                        style={[
                            styles.predictions,
                            {
                                opacity: this.state.opacity.interpolate(
                                    REVERSE_CONFIG
                                )
                            }
                        ]}
                    />
                ) : null}
                {productPending ? (
                    <ActivityIndicator
                        size="large"
                        style={StyleSheet.absoluteFill}
                    />
                ) : null}
                <ContinuePopup
                    isOpen={this.state.initialMessageVisible}
                    closeModal={this.handleInitialMessageClose}
                    message={NO_HERO_FOUND}
                />
                <SuccessPopup
                    openModal={changeLocationPopupVisible}
                    closeModal={this.changeLocationConfirmed}
                    title={CHANGE_LOCATION_TITLE}
                    message={CHANGE_LOCATION_MESSAGE}
                    showIcon={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    map: {
        flex: 1,
        shadowColor: 'transparent',
        justifyContent: 'center'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: emY(1.25),
        left: 0,
        right: 0
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: emY(1.25)
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: emY(1.25),
        fontFamily: 'Arial'
    },
    inputContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: emY(0.625),
        borderRadius: 5,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 7 },
                shadowOpacity: 0.17,
                shadowRadius: 8
            },
            android: {
                elevation: 2
            }
        }),
        flexWrap: 'wrap'
    },
    inputLabel: {
        fontSize: emY(1.25),
        fontWeight: 'bold',
        color: Color.GREY_400,
        marginRight: 50
    },
    inputValue: {
        fontSize: emY(1.25)
    },
    predictions: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    beaconMarker: {
        width: 42,
        height: 55
    }
});

MapScreen.navigationOptions = {
    header: <MapHeaderContainer />
};

const mapStateToProps = state => ({
    pending: getProductsPending(state),
    productPending: getProductsPending(state),
    predictions: getPredictions(state),
    searchVisible: getSearchVisible(state),
    header: state.header,
    region: getRegion(state),
    address: getAddress(state),
    error: getError(state)
});

const mapDispatchToProps = {
    getUserReadable,
    saveAddress,
    toggleSearch,
    dropdownAlert,
    setRegion,
    setCurrentLocation,
    getCurrentLocation,
    distanceMatrix,
    reverseGeocode,
    orderCreationSuccess,
    orderCreationFailure
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapScreen);
