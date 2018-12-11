import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import Text from './Text';
import Dimensions from '../constants/Dimensions';
import Style from '../constants/Style';

class Slides extends Component {
    renderSlides() {
        return this.props.data.map((slide, index) => (
            <View
                key={slide.text}
                style={[styles.slideStyle, { backgroundColor: slide.color }]}
            >
                <Text style={[styles.textStyle]}>{slide.text}</Text>
            </View>
        ));
    }

    render() {
        return (
            <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.window.width
    },
    textStyle: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#000',
        marginTop: 15
    }
};

export default Slides;
