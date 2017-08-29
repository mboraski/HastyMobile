import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class SearchBar extends Component {
    state = {
        value: '',
        focused: false
    };

    onPress = () => {};

    handleValue = value => {
        this.setState({ value });
    };

    handleFocus = () => {
        this.setState({ focused: true });
    };

    handleBlur = () => {
        this.setState({ focused: false });
    };

    focusInput = () => {
        this.input.focus();
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    ref={c => (this.input = c)}
                    style={styles.input}
                    value={this.state.value}
                    onChangeText={this.handleValue}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    underlineColorAndroid="transparent"
                />
                {!this.state.focused &&
                    <TouchableOpacity
                        onPress={this.focusInput}
                        style={[StyleSheet.absoluteFill, styles.imageContainer]}
                    >
                        <Image
                            source={require('../assets/icons/search.png')}
                            style={styles.image}
                        />
                    </TouchableOpacity>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        borderRadius: 50,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    input: {
        flex: 1,
        textAlign: 'center',
        height: 24
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 24,
        height: 24
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(SearchBar);
