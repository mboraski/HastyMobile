import React, { Component } from 'react';
import {
    View,
    Image,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Platform,
    Animated
} from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { saveAddress, setRegion } from '../actions/mapActions';
import { setCurrentLocation } from '../actions/cartActions';
import { getProductsByAddress } from '../actions/productActions';
import { toggleSearch } from '../actions/uiActions';
import PredictionList from '../components/PredictionList';
import MapHeader from '../containers/MapHeader';
import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
import { emY } from '../utils/em';
// TODO: change icon to one with point at center
import beaconIcon from '../assets/icons/beacon.png';

const OPACITY_DURATION = 300;
const REVERSE_CONFIG = {
    inputRange: [0, 1],
    outputRange: [1, 0]
};
const ASPECT_RATIO = Dimensions.window.width / Dimensions.window.height;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class MapScreen extends Component {
    state = {
        mapReady: false,
        address: '',
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
        searchRendered: false,
        getCurrentPositionPending: false
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will only work on a device'
            });
        } else if (!this.props.region) {
            this.getLocationAsync();
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

    onRegionChange = region => {
        if (this.state.mapReady) {
            this.props.setRegion(region);
        }
    };

    onRegionChangeComplete = region => {
        if (this.state.mapReady) {
            this.props.setRegion(region);
        }
    };

    onButtonPress = async () => {
        this.props.setCurrentLocation(this.props.address, this.props.region);
        await this.props.getProductsByAddress(this.props.address);
        this.props.navigation.navigate('home');
    };

    getLocationAsync = async () => {
        this.setState({ getCurrentPositionPending: true });
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            });
        }

        const location = await Location.getCurrentPositionAsync({});
        this.props.setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            longitudeDelta: LATITUDE_DELTA,
            latitudeDelta: LONGITUDE_DELTA
        });
        this.setState({ getCurrentPositionPending: false });
    };

    handleAddress = address => {
        this.setState({ address });
    };

    handleAddressFocus = () => {
        this.props.toggleSearch();
    };

    selectPrediction = prediction => {
        this.props.saveAddress(prediction.description);
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

    render() {
        const { predictions, region, address, pending } = this.props;
        const { getCurrentPositionPending } = this.state;

        if (getCurrentPositionPending) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        // TODO: User can select a location from search and have it
        // show as the center location of the map after clicked. then
        // user has to click use current location to proceed.

        return (
            <View style={styles.container}>
                {region ? (
                    <MapView
                        initialRegion={region}
                        style={styles.map}
                        onMapReady={this.onMapReady}
                        onRegionChange={this.onRegionChange}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                    >
                        <MapView.Marker
                            coordinate={region}
                            title="You"
                            description="Your Delivery Location"
                        >
                            <Image source={beaconIcon} style={{ top: '-50%', left: '38%' }} />
                        </MapView.Marker>
                    </MapView>
                ) : null}
                <TouchableWithoutFeedback onPress={this.handleAddressFocus}>
                    <Animated.View
                        style={[
                            styles.inputContainer,
                            { zIndex: 2 },
                            {
                                opacity: this.state.opacity,
                                transform: [{ translateY: this.state.translateY }]
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
                                opacity: this.state.opacity.interpolate(REVERSE_CONFIG)
                            }
                        ]}
                    />
                ) : null}
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
        shadowColor: 'transparent'
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
    setRegion,
    setCurrentLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
