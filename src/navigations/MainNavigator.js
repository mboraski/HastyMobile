// Third Party Imports
import { StackNavigator } from 'react-navigation';

// Relative Imports
import SearchForHeroScreen from '../screens/SearchForHeroScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import DeliveryDetailScreen from '../screens/DeliveryDetailScreen';
import DeliveryNotesScreen from '../screens/DeliveryNotesScreen';
import DeliveryStatusScreen from '../screens/DeliveryStatusScreen';
import CartScreen from '../screens/CartScreen';
import CreditCardScreen from '../screens/CreditCardScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import RecommendedScreen from '../screens/RecommendedScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import PromotionShareScreen from '../screens/PromotionShareScreen';
import HeroSignup from '../screens/HeroSignup';
import HistoryScreen from '../screens/HistoryScreen';

const MainNavigator = StackNavigator({
    welcome: { screen: WelcomeScreen },
    heroSignup: { screen: HeroSignup },
    history: { screen: HistoryScreen },
    auth: { screen: AuthScreen },
    profile: { screen: ProfileScreen },
    map: { screen: MapScreen },
    home: { screen: HomeScreen },
    searchForHero: { screen: SearchForHeroScreen },
    deliveryDetail: { screen: DeliveryDetailScreen },
    deliveryNotes: { screen: DeliveryNotesScreen },
    deliveryStatus: { screen: DeliveryStatusScreen },
    cart: { screen: CartScreen },
    creditCard: { screen: CreditCardScreen },
    paymentMethod: { screen: PaymentMethodScreen },
    checkout: { screen: CheckoutScreen },
    feedback: { screen: FeedbackScreen },
    promotionShare: { screen: PromotionShareScreen },
    recommended: { screen: RecommendedScreen }
    }, {
        initialRouteName: 'map',
        navigationOptions: {
            tabBarVisible: false
        },
        lazy: true
    });

export default MainNavigator;
