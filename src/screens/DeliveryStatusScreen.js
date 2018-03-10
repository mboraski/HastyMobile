// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
// import { Button } from 'react-native-elements';

// Relative Imports
import loaderGradient from '../assets/loader-gradient.png';
import loaderTicks from '../assets/loader-ticks.png';
import MenuButton from '../components/MenuButton';
import BrandButton from '../components/BrandButton';
import Notification from '../components/Notification';
import HeroList from '../components/HeroList';
// import Spinner from '../components/Spinner';
import Text from '../components/Text';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
// import tempAvatar from '../assets/profile.png';
// import { getFacebookInfo } from '../selectors/authSelectors';

const SIZE = emY(7);
const IMAGE_CONTAINER_SIZE = SIZE + emY(1.25);

class DeliveryStatusScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Order',
        headerLeft: <MenuButton style={Style.headerLeft} />,
        headerRight: <BrandButton onPress={() => navigation.goBack()} />,
        headerStyle: Style.headerBorderless,
        headerTitleStyle: [Style.headerTitle, Style.headerTitleLogo]
    });

    componentDidMount() { // TODO: do this for all screens with menu drawer
        if (this.props.header.isMenuOpen) {
            this.props.navigation.navigate('DrawerOpen');
        } else {
            this.props.navigation.navigate('DrawerClose');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.header.toggleState !== nextProps.header.toggleState) {
            if (nextProps.header.isMenuOpen) {
                this.props.navigation.navigate('DrawerOpen');
            } else {
                this.props.navigation.navigate('DrawerClose');
            }
        }
    }

    render() {
        // const { facebookInfo } = this.props;
        return (
            <View style={styles.container}>
                {/* <View style={styles.profile}>
                    {facebookInfo && facebookInfo.photoURL ? (
                        <Spinner
                            image={{ uri: facebookInfo.photoURL }}
                            style={styles.loader}
                        />
                    ) :
                        <Image
                            source={tempAvatar}
                            style={styles.image}
                        />
                    }
                </View> */}
                <View style={styles.spinner}>
                    <ActivityIndicator
                        size="large"
                        color="#F5A623"
                    />
                </View>
                <Text style={styles.searching}>Searching...</Text>
                <Notification onRef={ref => (this.notRef = ref)} />
                <View style={styles.label}>
                    <Text style={styles.labelText}>Located Heroes...</Text>
                </View>
                <HeroList />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    profile: {
        alignItems: 'center',
        marginTop: emY(2.68)
    },
    loader: {
        height: emY(11),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: emY(1)
    },
    imageContainer: {
        flexDirection: 'row',
        borderWidth: StyleSheet.hairlineWidth * 10,
        borderColor: Color.GREY_300,
        height: IMAGE_CONTAINER_SIZE,
        width: IMAGE_CONTAINER_SIZE,
        borderRadius: IMAGE_CONTAINER_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2
    },
    gradient: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [{ translate: [0, -SIZE * 1] }, { scale: 1 }]
    },
    ticks: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [{ translate: [-SIZE / 2, -SIZE / 2] }, { scale: 1.4 }]
    },
    searching: {
        color: Color.GREY_600,
        fontSize: emY(1.4375),
        textAlign: 'center',
        marginBottom: emY(3)
    },
    spinner: {
        marginVertical: 30
    },
    label: {
        borderBottomWidth: StyleSheet.hairlineWidth * 3,
        borderColor: Color.GREY_300,
        backgroundColor: Color.WHITE,
        paddingBottom: emY(0.375),
        marginLeft: 27,
        marginRight: 27
    },
    labelText: {
        color: Color.GREY_600,
        fontSize: emY(1.0625),
        letterSpacing: 0.5
    }
});

const mapStateToProps = state => ({
    header: state.header,
    // facebookInfo: getFacebookInfo(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryStatusScreen);
