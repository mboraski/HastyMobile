// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

// Relative Imports
import { reset } from '../actions/navigationActions';
import CloseButton from '../components/CloseButton';
import DoneButton from '../components/DoneButton';
import Rating from '../components/Rating';
import FeedbackForm from '../containers/FeedbackForm';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const keyboardVerticalOffset = emY(1);

class FeedbackScreen extends Component {
    state = {
        userRating: 0,
        productRating: 0,
        overallRating: 0,
        showForm: false
    };

    handleUserRating = userRating => {
        this.setState({ userRating });
    };

    handleProductRating = productRating => {
        this.setState({ productRating });
    };

    handleOverallRating = overallRating => {
        this.setState({ overallRating });
    };

    onButtonPress = () => {
        if (!this.state.showForm) {
            if (
                this.state.userRating <= 3 ||
                this.state.productRating <= 3 ||
                this.state.overallRating <= 3
            ) {
                this.setState({ showForm: true });
            }
        }
    };

    onSubmitSuccess = () => {
        this.props.navigation.dispatch(reset('home'));
    };

    render() {
        const { name, numProducts } = this.props;
        const { userRating, productRating, overallRating, showForm } = this.state;
        const productTitle = numProducts > 1 ? 'How were your products?' : 'How was your product?';
        return showForm ? (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <FeedbackForm onSubmitSucceeded={this.onSubmitSuccess} />
            </KeyboardAvoidingView>
        ) : (
            <View style={styles.container}>
                <View style={styles.ratings}>
                    <Text style={styles.title}>How was {name}?</Text>
                    <Rating
                        style={styles.rating}
                        value={userRating}
                        onChange={this.handleUserRating}
                    />
                    <Text style={styles.title}>{productTitle}</Text>
                    <Rating
                        style={styles.rating}
                        value={productRating}
                        onChange={this.handleProductRating}
                    />
                    <Text style={styles.title}>How was your experience overall?</Text>
                    <Rating
                        style={styles.rating}
                        value={overallRating}
                        onChange={this.handleOverallRating}
                    />
                </View>
                <Button
                    title="SEND"
                    onPress={this.onButtonPress}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.WHITE
    },
    title: {
        marginBottom: emY(1),
        fontSize: emY(1)
    },
    ratings: {
        alignItems: 'center',
        flex: 1,
        paddingTop: emY(2)
    },
    rating: {
        marginBottom: emY(4)
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: emY(1),
        marginBottom: emY(1)
    },
    buttonText: {
        fontSize: emY(1)
    }
});

FeedbackScreen.navigationOptions = ({ navigation }) => {
    const handlePressClose = () => navigation.dispatch(reset('home'));
    return {
        title: 'Feedback',
        headerLeft: <CloseButton onPress={handlePressClose} />,
        headerRight: <DoneButton />,
        headerStyle: Style.header,
        headerTitleStyle: Style.headerTitle
    };
};

const mapStateToProps = state => ({
    name: 'Jessica',
    numProducts: 1
});

export default connect(mapStateToProps, {})(FeedbackScreen);
