import { StyleSheet, Platform, StatusBar } from 'react-native';

import { emY } from '../utils/em';

export default StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        height: emY(5.9375),
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight
            }
        })
    },
    headerTitle: {
        alignSelf: 'center'
    },
    shadow: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.15,
            shadowRadius: 6
        },
        android: {
            elevation: 2
        }
    })
});
