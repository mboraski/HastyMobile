import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    StatusBar
} from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import LocationButton from '../components/LocationButton';
import MenuButton from '../components/MenuButton';
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
        address: ''
    };

    componentDidMount() {
        this.setState({ mapLoaded: true });
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

    render() {
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
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>To</Text>
                    <TextInput
                        value={this.state.address}
                        onChangeText={this.handleAddress}
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        title="Use Current Location"
                        onPress={this.onButtonPress}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        height: emY(5.95),
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight
            }
        })
    },
    headerTitle: {
        alignSelf: 'center',
        fontSize: emY(1.375)
    },
    container: {
        flex: 1
    },
    map: {
        flex: 1
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
    }
});

MapScreen.navigationOptions = {
    title: 'Hasty Logo',
    headerLeft: <MenuButton />,
    headerRight: <LocationButton />,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
};

export default connect(() => ({}), null)(MapScreen);
