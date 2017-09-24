// Third Party Imports
import { StackNavigator } from 'react-navigation';

// Relative Imports
import SearchForHeroScreen from '../screens/SearchForHeroScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import DeliveryDetailScreen from '../screens/DeliveryDetailScreen';
import DeliveryStatusScreen from '../screens/DeliveryStatusScreen';
import CartScreen from '../screens/CartScreen';
import CreditCardScreen from '../screens/CreditCardScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';

const MainNavigator = StackNavigator({
    welcome: { screen: WelcomeScreen },
    auth: { screen: AuthScreen },
    map: { screen: MapScreen },
    home: { screen: HomeScreen },
    searchForHero: { screen: SearchForHeroScreen },
    deliveryDetail: { screen: DeliveryDetailScreen },
    deliveryStatus: { screen: DeliveryStatusScreen },
    cart: { screen: CartScreen },
    creditCard: { screen: CreditCardScreen },
    paymentMethod: { screen: PaymentMethodScreen }
    }, {
        navigationOptions: {
            tabBarVisible: false
        },
        lazy: true
    });

export default MainNavigator;
