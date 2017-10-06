// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

// Relative Imports
import CloseButton from '../components/CloseButton';
import DoneButton from '../components/DoneButton';
import Rating from '../components/Rating';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

class FeedbackScreen extends Component {
    state = {
        userRating: 0,
        productRating: 0,
        overallRating: 0
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

    render() {
        const { name, numProducts } = this.props;
        const { userRating, productRating, overallRating } = this.state;
        const productTitle = numProducts > 1 ? 'How were your products?' : 'How was your product?';
        return (
            <View style={styles.container}>
                <View style={styles.ratings}>
                    <Text style={styles.title}>How was {name}?</Text>
                    <Rating style={styles.rating} value={userRating} onChange={this.handleUserRating} />
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
        backgroundColor: Color.WHITE,
        paddingTop: emY(2)
    },
    title: {
        marginBottom: emY(1),
        fontSize: emY(1)
    },
    ratings: {
        alignItems: 'center',
        flex: 1
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

FeedbackScreen.navigationOptions = {
    title: 'Feedback',
    headerLeft: <CloseButton />,
    headerRight: <DoneButton />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
};

const mapStateToProps = state => ({
    name: 'Jessica',
    numProducts: 1
});

export default connect(mapStateToProps, {})(FeedbackScreen);
