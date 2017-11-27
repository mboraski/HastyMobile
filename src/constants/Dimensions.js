// We are not listening to the change event bc we lock phone to protrait
import { Dimensions } from 'react-native';

export default {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen')
};
