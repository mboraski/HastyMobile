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
import checkIcon from '../assets/icons/check.png';

const SIZE = emY(3.44);
const message = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
type Props = {
    openModal: boolean,
    closeModal: () => {}
};

class SuccessPopup extends Component {
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
                        activeOpacity={1}
                    >
                        <Text style={Style.clearText}>.</Text>
                    </TouchableOpacity>
                    <View style={styles.innerContainer}>
                        <Text style={styles.label}>Successful</Text>
                        <Image source={checkIcon} style={styles.checkIcon} resizeMode="contain" />
                        <Text style={styles.label}>{message}</Text>
                        <TouchableOpacity
                            onPress={() => this.closeModal(true)}
                            style={[styles.button, { backgroundColor: Color.BLACK }]}
                        >
                            <Text style={[styles.buttonLabel, { color: Color.WHITE }]}>Apply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.closeModal(false)}
                            style={[styles.button, { backgroundColor: Color.CLEAR }]}
                        >
                            <Text style={[styles.buttonLabel, { color: Color.BLACK }]}>Cancel</Text>
                        </TouchableOpacity>
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
    checkIcon: {
        width: SIZE,
        height: SIZE,
        alignSelf: 'center'
    },
    button: {
        height: emY(2.5),
        marginHorizontal: 33,
        marginVertical: emY(0.75),
        borderRadius: emY(1.25),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        fontSize: emY(0.96),
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(SuccessPopup);
