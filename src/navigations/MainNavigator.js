// Third Party Imports
import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

// Relative Imports
import LoadingScreen from '../screens/LoadingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductsScreen from '../screens/ProductsScreen';
import MapScreen from '../screens/MapScreen';
import DeliveryNotesScreen from '../screens/DeliveryNotesScreen';
import DeliveryStatusScreen from '../screens/DeliveryStatusScreen';
import CartScreen from '../screens/CartScreen';
import CreditCardScreen from '../screens/CreditCardScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OpenFeedbackScreen from '../screens/OpenFeedbackScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import PromotionShareScreen from '../screens/PromotionShareScreen';
import NotificationFeedbackScreen from '../screens/NotificationFeedbackScreen';

const getHeaderMode = () => (Platform.OS === 'ios' ? 'screen' : 'screen');

export default createStackNavigator(
    {
        loading: { screen: LoadingScreen },
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        profile: { screen: ProfileScreen },
        map: { screen: MapScreen },
        products: { screen: ProductsScreen },
        deliveryNotes: { screen: DeliveryNotesScreen },
        deliveryStatus: { screen: DeliveryStatusScreen },
        cart: { screen: CartScreen },
        creditCard: { screen: CreditCardScreen },
        paymentMethod: { screen: PaymentMethodScreen },
        checkout: { screen: CheckoutScreen },
        openFeedback: { screen: OpenFeedbackScreen },
        feedback: { screen: FeedbackScreen },
        promotionShare: { screen: PromotionShareScreen },
        notificationFeedback: { screen: NotificationFeedbackScreen }
    },
    {
        initialRouteName: 'loading',
        navigationOptions: {
            tabBarVisible: false
        },
        headerMode: getHeaderMode()
    }
);
