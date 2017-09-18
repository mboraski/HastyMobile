import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';
import debounce from 'lodash/debounce';

import Style from '../constants/Style';
import { emY } from '../utils/em';

const SIZE = emY(1.5);

class DebounceTextInput extends Component {
    static defaultProps = {
        onChangeText: () => {}
    };

    handleText = text => {
        this.props.onChangeText(text);
        this.onDebounce(text);
    };

    onDebounce = text => {
        this.props.onDebounce(text);
    };

    onDebounce = debounce(this.onDebounce, 500);

    render() {
        const { style, ...props } = this.props;
        return (
            <TextInput
                ref={c => (this.component = c)}
                {...props}
                style={[styles.container, style]}
                underlineColorAndroid="transparent"
                onChangeText={this.handleText}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: emY(0.625),
        flex: 1
    }
});

export default DebounceTextInput;
