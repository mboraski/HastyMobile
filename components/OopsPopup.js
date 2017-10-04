// Third Party Imports
import React, { Component } from 'react';
import {
    StyleSheet,
    Modal,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';
import checkIcon from '../assets/icons/check.png';

const SIZE = emY(3.44);

class OopsPopup extends Component {
    onPress = () => {};

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.container}>
                    <Text style={styles.label}>Successful</Text>
                    <Image source={checkIcon} style={styles.checkIcon} resizeMode="contain" />
                    <Text style={styles.label}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    <TouchableOpacity style={styles.applyButton}>Apply</TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton}>Apply</TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    image: {
        width: SIZE,
        height: SIZE
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(OopsPopup);
