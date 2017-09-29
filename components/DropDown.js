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

class DropDown extends Component {
    state = {
        expanded: true,
        animation: new Animated.Value(),
        maxHeight: 0,
        minHeight: emY(3.3)
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
    }

    render() {
        const { header } = this.props;
        return (
            <Animated.View style={[styles.container, { height: this.state.animation }]}>
                <View onLayout={this.setMinHeight}>
                    <TouchableOpacity onPress={this.toggle}>
                        {header}
                    </TouchableOpacity>
                </View>
                <View style={styles.body} onLayout={this.setMaxHeight}>
                    {this.props.children}
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        overflow: 'hidden'
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(DropDown);
