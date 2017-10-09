// Third Party Imports
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';
import arrowIcon from '../assets/icons/disclosureIndicator.png';

class DropDown extends Component {
    state = {
        expanded: true,
        animation: new Animated.Value(),
        maxHeight: 0,
        minHeight: emY(3.3),
        spinValue: new Animated.Value(0),
    };

    componentDidMount() {
        const { minHeight } = this.state;
        this.state.animation.setValue(0);
        Animated.spring(
            this.state.animation,
            {
                toValue: minHeight
            }
        ).start();
        this.state.spinValue.setValue(1);
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: 400,
            }
        ).start();
        this.setState({ 
            expanded: false
        });
    }

    setMaxHeight = event => {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }
    
    setMinHeight = event => {
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    }

    toggle = () => {
        const initialValue = (this.state.expanded) ? 
            this.state.maxHeight + this.state.minHeight : this.state.minHeight;
        const finalValue = (this.state.expanded) ? 
            this.state.minHeight : this.state.maxHeight + this.state.minHeight;
        const initialDegree = (this.state.expanded) ? 0 : 1;
        const finalDegree = (this.state.expanded) ? 1 : 0;
        this.setState({
            expanded: !this.state.expanded
        });
        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start(); 
        this.state.spinValue.setValue(initialDegree);
        Animated.timing(
            this.state.spinValue,
            {
                toValue: finalDegree,
                duration: 400,
            }
        ).start();
    }

    render() {
        const { header } = this.props;
        const { animation } = this.state;
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-90deg']
        });
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.container, { height: animation }]}>
                    <View onLayout={this.setMinHeight}>
                        <TouchableOpacity onPress={this.toggle}>
                            {header}
                        </TouchableOpacity>
                    </View>
                    <View onLayout={this.setMaxHeight}>
                        {this.props.children}
                    </View>
                </Animated.View>
                <TouchableOpacity style={styles.arrowContainer} onPress={this.toggle}>
                    <Animated.Image 
                        source={arrowIcon}
                        style={[
                            arrowIcon,
                            {
                                transform: [{ rotate: spin }],
                                backgroundColor: 'rgba(0, 0, 0, 0)' 
                            }
                        ]}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden'
    },
    arrowContainer: {
        position: 'absolute',
        right: 16,
        top: emY(1.5)
    },
    arrowIcon: {
        width: emY(0.9),
        height: emY(0.9)
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(DropDown);
