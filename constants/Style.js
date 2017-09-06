import { StyleSheet, Platform, StatusBar } from 'react-native';

import { emY } from '../utils/em';

const header = {
    backgroundColor: '#fff',
    height: emY(5.9375),
    ...Platform.select({
        android: {
            paddingTop: StatusBar.currentHeight
        }
    })
};

export default StyleSheet.create({
    header,
    headerBorderless: {
        ...header,
        ...Platform.select({
            ios: {
                borderBottomWidth: 0,
                borderBottomColor: 'transparent'
            },
            android: {
                elevation: 0
            }
        }),
        shadowRadius: 0,
        shadowOffset: {
            height: 0
        },
        shadowColor: 'transparent'
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
