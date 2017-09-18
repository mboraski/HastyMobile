// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

// Relative Imports
import Prediction from '../components/Prediction';

class PredictionList extends Component {
    renderPrediction = (prediction, index) => {
        const onPress = () => this.props.selectPrediction(prediction);
        return <Prediction key={index} prediction={prediction} onPress={onPress} />;
    };

    render() {
        const { predictions, style, ...props } = this.props;
        return (
            <ScrollView {...props} style={[styles.container, style]} keyboardDismissMode="on-drag">
                {predictions.map(this.renderPrediction)}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default PredictionList;
