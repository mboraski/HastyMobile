// Third Party Imports
import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import ShareButton from '../components/ShareButton';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import instagramIcon from '../assets/icons/instagram_white.png';
import twitterIcon from '../assets/icons/twitter_white.png';
import facebookIcon from '../assets/icons/facebook_white.png';
import pinterestIcon from '../assets/icons/pinterest_white.png';
import closeIcon from '../assets/icons/close.png';


class PromotionShareScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <ShareButton style={styles.buton} source={instagramIcon} />
                    <ShareButton style={styles.buton} source={twitterIcon} />
                </View>
                <View style={styles.row}>
                    <ShareButton style={styles.buton} source={facebookIcon} />
                    <ShareButton style={styles.buton} source={pinterestIcon} />
                </View>
                <View style={styles.bottomSection}>
                    <ShareButton style={styles.closeButton} source={closeIcon} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: emY(1.25)
    },
    buton: {
        backgroundColor: Color.GREY_400,
        marginHorizontal: 10
    },
    bottomSection: {
        position: 'absolute',
        bottom: emY(3.86),
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    closeButton: {
        borderColor: Color.BLACK,
        borderWidth: 1
    }
}); 

PromotionShareScreen.navigationOptions = {
    title: 'Promtion',
    header: null 
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(PromotionShareScreen);
