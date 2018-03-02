import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Platform,
    Animated,
    ActivityIndicator,
    Image,
    PanResponder
} from 'react-native';
import { MapView, Constants } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import debounce from 'lodash/debounce';

import {
    saveAddress,
    setRegion,
    getCurrentLocation
} from '../actions/mapActions';
import { setCurrentLocation } from '../actions/cartActions';
import { distanceMatrix, reverseGeocode } from '../actions/googleMapsActions';
import { getProductsByAddress } from '../actions/productActions';
import { toggleSearch, dropdownAlert } from '../actions/uiActions';
import ContinuePopup from '../components/ContinuePopup';
import PredictionList from '../components/PredictionList';
import MapHeader from '../containers/MapHeader';
import Color from '../constants/Color';
import { emY } from '../utils/em';
// TODO: change icon to one with point at center
import beaconIcon from '../assets/icons/beacon.png';

const INITIAL_MESSAGE = `2018 SXSW Notice: Service is only available between streets E 6th St and Congress Ave of Downtown Austin Texas for the SXSW festival.
Come check us out! We are a new startup, born and bread right here in Austin, Texas!`;

const OPACITY_DURATION = 300;
const REVERSE_CONFIG = {
    inputRange: [0, 1],
    outputRange: [1, 0]
};

class MapScreen extends Component {
    state = {
        mapReady: false,
        address: '',
        initialRegion: this.props.region,
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
        searchRendered: false,
        getCurrentPositionPending: false,
        initialMessageVisible: true
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will only work on a device'
            });
        } else if (!this.props.region) {
            this.props.getCurrentLocation();
        }
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
    }

    onMapReady = () => {
        this.setState({ mapReady: true });
    };

    onRegionChangeComplete = async region => {
        if (this.state.mapReady) {
            this.setState({ showImageMarker: false });
            this.props.setRegion(region);
            this.getAddress({
                latlng: `${region.latitude},${region.longitude}`
            });
        }
    };

    onButtonPress = async () => {
        const result = await this.props.distanceMatrix({
            units: 'imperial',
            origins: '30.268066,-97.7450017', // E 6th St & Congress Ave, Austin, TX 78701
            destinations: `${this.props.region.latitude},${
                this.props.region.longitude
            }`
        });
        if (result.rows[0].elements[0].duration.value > 60 * 30) {
            this.props.dropdownAlert(true, 'Service is not available here');
        } else {
            this.props.dropdownAlert(false, '');
            this.props.setCurrentLocation(
                this.props.address,
                this.props.region
            );
            await this.props.getProductsByAddress(this.props.address);
            this.props.navigation.navigate('home');
        }
    };

    getAddress = debounce(this.props.reverseGeocode, 1000, {
        leading: false,
        tailing: true
    });

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
            this.setState({ showImageMarker: true });
        }
    });

    handleRegionChange = region => {
        if (this.state.mapReady) {
            this.setState({ showImageMarker: true });
            this.props.setRegion(region);
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

        return (
            <View style={styles.container}>
                {region ? (
                    <MapView
                        {...this.panResponder.panHandlers}
                        initialRegion={this.state.initialRegion}
                        region={region || this.state.initialRegion}
                        style={styles.map}
                        onMapReady={this.onMapReady}
                        onRegionChange={this.handleRegionChange}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                    >
                        {this.state.showImageMarker ? (
                            <Image
                                source={beaconIcon}
                                style={{
                                    alignSelf: 'center',
                                    transform: [{ translate: [12, -25] }]
                                }}
                            />
                        ) : (
                            <MapView.Marker
                                image={beaconIcon}
                                coordinate={region}
                                title="You"
                                description="Your Delivery Location"
                                anchor={{ x: 0.2, y: 1 }}
                                centerOffset={{ x: 12, y: -25 }}
                            />
                        )}
                    </MapView>
                ) : null}
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
                        onPress={this.onButtonPress}
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
                    openModal={this.state.initialMessageVisible}
                    closeModal={this.handleInitialMessageClose}
                    message={INITIAL_MESSAGE}
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
        fontSize: emY(1.25)
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
    }
});

MapScreen.navigationOptions = {
    title: 'Hasty Logo',
    header: <MapHeader />
};

const mapStateToProps = state => ({
    pending: state.map.pending || state.product.pending,
    productPending: state.product.pending,
    predictions: state.map.predictions,
    searchVisible: state.ui.searchVisible,
    header: state.header,
    region: state.map.region,
    address: state.map.address
});

const mapDispatchToProps = {
    saveAddress,
    getProductsByAddress,
    toggleSearch,
    dropdownAlert,
    setRegion,
    setCurrentLocation,
    getCurrentLocation,
    distanceMatrix,
    reverseGeocode
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
