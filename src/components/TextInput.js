import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class AppTextInput extends Component {
    render() {
        return (
            <TextInput
                ref={c => (this.component = c)}
                {...this.props}
                style={[styles.textInput, this.props.style]}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'Arial'
    }
});
