import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Platform,
    StatusBar,
    Animated
} from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { saveAddress } from '../actions/addressActions';
import { toggleSearch } from '../actions/uiActions';
import PredictionList from '../components/PredictionList';
import MapHeader from '../containers/MapHeader';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import pinIcon from '../assets/icons/pin.png';

class MapScreen extends Component {
    state = {
        mapLoaded: false,
        region: {
            longitude: -97.76,
            latitude: 30.26,
            longitudeDelta: 0.1,
            latitudeDelta: 0.25
        },
        address: '',
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1)
    };

    componentDidMount() {
        this.setState({ mapLoaded: true });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.searchVisible !== nextProps.searchVisible) {
            this.animate(nextProps.searchVisible);
        }
    }

    onRegionChangeComplete = region => {
        console.log('region: ', region);
        this.setState({ region });
    };

    onButtonPress = () => {
        this.props.navigation.navigate('home');
    };

    handleAddress = address => {
        this.setState({ address });
    };

    handleAddressFocus = () => {
        this.props.dispatch(toggleSearch());
    };

    selectPrediction = prediction => {
        this.props.dispatch(saveAddress(prediction.description));
    };

    animate(searchVisible) {
        this.setState({ searchRendered: searchVisible }, () => {
            Animated.parallel([
                Animated.timing(this.state.translateY, {
                    toValue: searchVisible ? -100 : 0,
                    duration: 300
                }),
                Animated.timing(this.state.opacity, {
                    toValue: searchVisible ? 0 : 1,
                    duration: 300
                })
            ]).start(() => {
                this.setState({
                    searchRendered: searchVisible
                });
            });
        });
    }

    render() {
        const { searchVisible, predictions } = this.props;

        if (!this.state.mapLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <MapView
                    region={this.state.region}
                    style={styles.map}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                >
                    <MapView.Marker
                        image={pinIcon}
                        coordinate={{
                            latitude: 30.26,
                            longitude: -97.76
                        }}
                        title="You"
                        description="Your Delivery Location"
                    />
                </MapView>
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
                    </Animated.View>
                </TouchableWithoutFeedback>
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        title="Use Current Location"
                        onPress={this.onButtonPress}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
                {searchVisible && predictions.length > 0 ? (
                    <PredictionList
                        predictions={predictions}
                        selectPrediction={this.props.selectPrediction}
                        style={styles.predictions}
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
        margin: emY(0.625),
        borderRadius: 5,
        height: emY(3.5),
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
        })
    },
    inputLabel: {
        fontSize: emY(1.25),
        fontWeight: 'bold',
        color: Color.GREY_400,
        marginRight: 50
    },
    textInput: {
        flex: 1,
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
    predictions: state.address.predictions,
    searchVisible: state.ui.searchVisible
});

export default connect(mapStateToProps)(MapScreen);
