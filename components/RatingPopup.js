// Third Party Imports
import React, { Component } from 'react';
import {
    StyleSheet,
    Modal,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import starIcon from '../assets/icons/star.png';

const SIZE = emY(1.58);
const message = 'Tap the number of stars you would give us on scale from 1-5.';
type Props = {
    openModal: boolean,
    closeModal: () => {}
};

class RatingPopup extends Component {
    state = {
        modalVisible: false,
    }

    componentDidMount() {
        const { openModal } = this.props;
        this.setState({
            modalVisible: openModal,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.openModal !== this.props.openModal) {
            this.setState({
                modalVisible: nextProps.openModal
            });
        }
    }

    closeModal(isApply) {
        this.props.closeModal();
    }

    props: Props;

    render() {
        const { modalVisible } = this.state;
        return (
            <Modal
                animationType="slide" 
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {}}
                style={styles.modalContainer}
            >
                <View style={styles.container}>
                    <TouchableOpacity 
                        style={Style.backdropContainer}
                        onPress={() => this.closeModal()}
                        activeOpacity="1"
                    >
                        <Text style={Style.clearText}>.</Text>
                    </TouchableOpacity>
                    <View style={styles.innerContainer}>
                        <Text style={styles.label}>How would you like to rate us?</Text>
                        <View style={styles.rattingContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Image source={starIcon} style={styles.starIcon} resizeMode="contain" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Image source={starIcon} style={styles.starIcon} resizeMode="contain" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Image source={starIcon} style={styles.starIcon} resizeMode="contain" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Image source={starIcon} style={styles.starIcon} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={styles.label}>
                            Tap the number of stars you would give us on scale from 1-5
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.CLEAR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        backgroundColor: Color.WHITE,
        paddingVertical: emY(1.13), 
        paddingHorizontal: 17,
        marginHorizontal: 22,
        borderRadius: 4,
        justifyContent: 'center',
        alignSelf: 'stretch',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: emY(0.625) },
                shadowOpacity: 0.5,
                shadowRadius: emY(1.5)
            },
            android: {
                elevation: 10
            }
        })
    },
    label: {
        textAlign: 'center',
        fontSize: emY(1.08),
        marginVertical: emY(1.58),
    },
    rattingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: emY(0.8)
    },
    button: {
        height: emY(3.3),
        width: emY(3.3),
        marginHorizontal: 5,
        borderRadius: emY(1.65),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.BLACK,
    },
    starIcon: {
        width: SIZE,
        height: SIZE,
    },
    buttonLabel: {
        fontSize: emY(0.96),
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(RatingPopup);