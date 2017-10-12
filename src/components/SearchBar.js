import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import Style from '../constants/Style';
import { emY } from '../utils/em';
import searchIcon from '../assets/icons/search.png';

const SIZE = emY(1.5);

type Props = {
    onFocus: () => {}
};

class SearchBar extends Component {
    
    state = {
        value: '',
        focused: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.homeSearch.searchText !== nextProps.homeSearch.searchText) {
            this.setState({ value: nextProps.homeSearch.searchText });
        }
    }

    onPress = () => {};

    props: Props;

    handleValue = value => {
        this.setState({ value });
    };

    handleFocus = () => {
        this.setState({ focused: true });
        this.props.onFocus();
    };

    handleBlur = () => {
        this.setState({ focused: false });
    };

    focusInput = () => {
        this.input.focus();
    };

    render() {
        return (
            <View style={[styles.container]}>
                <TextInput
                    ref={c => (this.input = c)}
                    style={styles.input}
                    value={this.state.value}
                    onChangeText={this.handleValue}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    underlineColorAndroid="transparent"
                />
                {!this.state.focused && !this.state.value &&
                    <TouchableOpacity
                        onPress={this.focusInput}
                        style={[StyleSheet.absoluteFill, styles.imageContainer]}
                    >
                        <Image
                            source={searchIcon}
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
        paddingHorizontal: 20,
        paddingVertical: emY(0.625),
        ...Platform.select({
            ios: {
                width: '100%'
            },
            android: {
                width: '90%'
            }
        })
    },
    input: {
        flex: 1,
        textAlign: 'center',
        height: SIZE
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE
    }
});

const mapStateToProps = state => ({
    homeSearch: state.homeSearch,
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
