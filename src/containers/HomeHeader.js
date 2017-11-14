import React, { Component } from 'react';
import { StyleSheet, View, Animated, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { showSearch, hideSearch } from '../actions/uiActions';
import { setSearchQuery } from '../actions/homeActions';
import BackButton from '../components/BackButton';
import CloseButton from '../components/CloseButton';
import SearchBarButton from '../components/SearchBarButton';
import CartButton from '../components/CartButton';
import MenuButton from '../components/MenuButton';
import Style from '../constants/Style';
import { emY } from '../utils/em';

import searchIcon from '../assets/icons/search.png';

const OPACITY_DURATION = 300;
const APPBAR_HEIGHT = emY(5.95);
const REVERSE_CONFIG = {
    inputRange: [0, 1],
    outputRange: [1, 0]
};
const SIZE = emY(1.5);

type Props = {
    navigation: any,
}

export class HomeHeader extends Component {
    state = {
        opacity: new Animated.Value(this.props.searchVisible ? 0 : 1),
        searchRendered: this.props.searchVisible
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.searchVisible !== nextProps.searchVisible) {
            this.animate(nextProps.searchVisible);
        }
    }
    
    props: Props;

    animate = searchVisible => {
        if (this.state.searchRendered) {
            this.afterSetState(searchVisible);
        } else {
            this.setState({ searchRendered: searchVisible }, () =>
                this.afterSetState(searchVisible)
            );
        }
    };

    afterSetState = searchVisible => {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: searchVisible ? 0 : 1,
                duration: OPACITY_DURATION
            })
        ]).start(() => {
            this.setState({
                searchRendered: searchVisible
            });
            if (searchVisible) {
                this.input.focus();
            }
        });
    };

    clearSearch = () => {
        this.props.setSearchQuery('');
    };

    handleInput = text => {
        this.props.setSearchQuery(text);
    };

    render() {
        const { navigation, searchQuery } = this.props;
        return (
            <View style={styles.wrapper}>
                <Animated.View
                    style={[Style.header, styles.header, { opacity: this.state.opacity }]}
                >
                    <View style={Style.appBar}>
                        <View style={Style.headerLeftContainer}>
                            <MenuButton style={Style.headerLeft} />
                        </View>
                        <View style={Style.headerTitleContainer}>
                            <SearchBarButton onPress={this.props.showSearch} />
                        </View>
                        <View style={Style.headerRightContainer}>
                            <CartButton style={Style.headerRight} navigation={navigation} />
                        </View>
                    </View>
                </Animated.View>
                {this.state.searchRendered ? (
                    <Animated.View
                        style={[
                            Style.header,
                            styles.header,
                            { opacity: this.state.opacity.interpolate(REVERSE_CONFIG) }
                        ]}
                    >
                        <View style={Style.appBar}>
                            <View style={Style.headerLeftContainer}>
                                <BackButton style={Style.headerLeft} onPress={this.props.hideSearch} />
                            </View>
                            <TextInput
                                ref={c => (this.input = c)}
                                style={Style.headerTitleContainer}
                                placeholder="Search Products"
                                value={searchQuery}
                                onChangeText={this.handleInput}
                                onBlur={this.props.hideSearch}
                            />
                            <View style={Style.headerRightContainer}>
                                <CloseButton style={Style.headerRight} onPress={this.clearSearch} />
                            </View>
                        </View>
                    </Animated.View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
        height: APPBAR_HEIGHT
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: APPBAR_HEIGHT
    },
    title: {
        flex: 1
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
    searchVisible: state.ui.searchVisible,
    searchQuery: state.home.searchQuery
});

const mapDispatchToProps = {
    showSearch,
    hideSearch,
    setSearchQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
