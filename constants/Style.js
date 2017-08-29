import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        height: 95,
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
