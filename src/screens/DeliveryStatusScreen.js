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
import {
    listenToOrder,
    unlistenToOrder
} from '../actions/orderActions';
import orderStatuses from '../constants/Order';

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

    componentDidMount() {
        const orderId = this.props.orderId;
        if (orderId) {
            this.props.listenToOrder(orderId);
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
        if (this.props.status !== nextProps.status) {
            this.notRef.receiveNotification();
            if (nextProps.status === 'completed') {
                this.props.clearCart();
                this.props.clearOrder();
                this.props.navigation.navigate('map');
            }
        }
    }

    componentWillUnmount() {
        this.props.unlistenToOrder(this.props.orderId);
    }

    renderHeroList() {
        if ((this.props.status === orderStatuses.accepted) || (this.props.status === orderStatuses.arrived)) {
            return (
                <View style={styles.container}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Hero Details:</Text>
                    </View>
                    <HeroList />
                </View>
            );
        }
    }

    renderArrived() {
        if (this.props.status === orderStatuses.arrived) {
            return (
                <View style={styles.container}>
                    <View style={styles.labelAlt}>
                        <Text style={styles.labelText}>Note: Look for orange Hasty shirt!</Text>
                    </View>
                </View>
            );
        }
    }

    render() {
        const { orderId } = this.props;
        return (
            <View style={styles.container}>
                {orderId ?
                    <View style={styles.container}>
                        <View style={styles.spinner}>
                            <ActivityIndicator
                                size="large"
                                color="#F5A623"
                            />
                        </View>
                        <Notification onRef={ref => (this.notRef = ref)} />
                        {/* {this.renderHeroList()} */}
                        {this.renderArrived()}
                    </View> :
                    <View style={styles.container}>
                        <Text>No current orders</Text>
                    </View>
                }
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
        marginTop: 30,
        marginBottom: 20
    },
    label: {
        borderBottomWidth: StyleSheet.hairlineWidth * 3,
        borderColor: Color.GREY_300,
        backgroundColor: Color.WHITE,
        paddingBottom: 5,
        marginLeft: 27,
        marginRight: 27
    },
    labelAlt: {
        borderColor: Color.GREY_300,
        backgroundColor: Color.WHITE,
        paddingBottom: 5,
        marginLeft: 27,
        marginRight: 27,
        marginVertical: 10
    },
    labelText: {
        color: Color.GREY_600,
        fontSize: emY(1.0625),
        letterSpacing: 0.5
    }
});

const mapStateToProps = state => ({
    header: state.header,
    orderId: state.order.currentOrderDatabaseKey,
    status: state.order.status,
    pending: state.order.pending
});

const mapDispatchToProps = {
    listenToOrder,
    unlistenToOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryStatusScreen);
