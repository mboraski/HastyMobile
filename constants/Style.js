import { StyleSheet, Platform, StatusBar } from 'react-native';

import { emY } from '../utils/em';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

const header = {
    flexDirection: 'row',
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#fff',
    height: emY(5.3125),
    shadowRadius: 0,
    shadowOffset: {
        height: 0
    },
    shadowColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, .3)',
    ...Platform.select({
        android: {
            paddingTop: StatusBar.currentHeight,
            elevation: 0
        }
    })
};

const headerItem = {
    justifyContent: 'center',
    alignItems: 'center'
};

export default StyleSheet.create({
    header,
    headerLarge: {
        ...header,
        height: emY(5.9375)
    },
    headerBorderless: {
        ...header,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
    },
    appBar: {
        flex: 1
    },
    headerItem,
    headerTitleContainer: {
        ...headerItem,
        bottom: 0,
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
        top: 0,
        position: 'absolute',
        alignSelf: 'center'
    },
    headerLeftContainer: {
        ...headerItem,
        left: 0,
        bottom: 0,
        top: 0,
        position: 'absolute',
    },
    headerRightContainer: {
        ...headerItem,
        right: 0,
        bottom: 0,
        top: 0,
        position: 'absolute',
    },
    headerTitle: {
        ...headerItem,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, .9)',
        marginHorizontal: 16,
        fontWeight: '500',
        fontSize: 17
    },
    headerLeft: {
        marginRight: 0,
        marginLeft: 20
    },
    headerRight: {
        marginRight: 20,
        marginLeft: 0
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
