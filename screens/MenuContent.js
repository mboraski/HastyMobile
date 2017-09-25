import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
	Text,
	Image,
	View
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';
import Color from '../constants/Color';
import MenuItem from '../components/MenuItem';
import BackButton from '../components/BackButton';
import heroIcon from '../assets/icons/hero.png';
import historyIcon from '../assets/icons/history.png';
import favoriteIcon from '../assets/icons/favorite.png';
import notificationIcon from '../assets/icons/notification.png';
import cartIcon from '../assets/icons/cart.png';
import paymentIcon from '../assets/icons/payment.png';
import promotionIcon from '../assets/icons/promotion.png';
import helpIcon from '../assets/icons/info.png';


const IMAGE_CONTAINER_SIZE = emY(6.25);
  
class MenuContent extends Component {
	state = {
		name: 'Hanna Morgan',
		avatar: 'https://facebook.github.io/react/img/logo_og.png'
	};
	
    render() {
		const { name, avatar } = this.state;

		return (
				<ScrollView style={styles.scrollContainer}>
					<View style={styles.container}>
						<View style={styles.headerContainer}>
							<View style={styles.imageContainer}>
								<Image source={{ uri: avatar }} style={styles.image} />
							</View>
							<Text style={styles.name}>{name}</Text>
						</View>
						<View style={styles.profileTitleContainer}>
							<Text style={styles.title}>View Profile</Text>
						</View>
						<View style={styles.listContainer}>
							<MenuItem image={heroIcon} title="Heroes Needed!" />
							<MenuItem image={historyIcon} title="History" />
							<MenuItem image={favoriteIcon} title="Favorites & Recommended" />
							<MenuItem image={notificationIcon} title="Notifications" badge="3" />
							<MenuItem image={cartIcon} title="Cart" />
							<MenuItem image={paymentIcon} title="Payment Info" />
							<MenuItem image={promotionIcon} title="Promotions" />
							<MenuItem image={helpIcon} title="Help" />
						</View>
						
					</View>
					<BackButton style={styles.backButton} />
					<Text style={styles.copyright}>@2017 Hasty</Text>		
				</ScrollView>
		);
    }
}
  
const styles = StyleSheet.create({
    scrollContainer: {
		flex: 1,
		backgroundColor: Color.WHITE,
		borderRightWidth: 2, 
		borderRightColor: Color.YELLOW_500 
	},
	container: {
		flex: 1
	},
	headerContainer: {
		alignItems: 'center',
		marginTop: emY(2.68)
	},
	imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
		justifyContent: 'center',
		width: IMAGE_CONTAINER_SIZE,
        height: IMAGE_CONTAINER_SIZE,
		marginBottom: emY(1)
	},
	image: {
        width: IMAGE_CONTAINER_SIZE,
        height: IMAGE_CONTAINER_SIZE,
		borderRadius: IMAGE_CONTAINER_SIZE / 2,
	},
	name: {
        color: Color.GREY_700,
        fontSize: emY(1.25),
        textAlign: 'center',
        marginBottom: emY(0.606)
	},
	title: {
        fontSize: emY(0.831),
        color: Color.GREY_700,
        textAlign: 'center',
	},
	profileTitleContainer: {
		justifyContent: 'center',
		marginTop: emY(0.5),
		marginBottom: emY(1)
	},
	listContainer: {
		flexDirection: 'column',
		marginLeft: emY(1.2)
	},
	copyright: {
		height: emY(1),
        marginTop: emY(4.56),
        marginBottom: emY(0.9),
		fontSize: emY(0.831),
        color: Color.GREY_700,
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: emY(2.1)
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(MenuContent); 
