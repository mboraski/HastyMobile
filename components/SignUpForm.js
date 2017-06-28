import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-hasty-14d18.cloudfunctions.net';

class SignUpForm extends Component {
  state = { phone: '' }; // es2017 allows for this declaration instead of using constructor

  // we use async await here, which is another new JS feature
  // these are just syntactic sugar for .then and catch of traditional promises
  handleSubmit = async () => {
    // defining handleSubmit like this with es2017, the arrow function binds "this" for us.
    try {
      // await does not change how js behaves. It tells babel that after this line is executed
      // will return a promise, so do not execte the next line until the promise resolves
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone });
    } catch (err) {
      // if either await request within try errors, then code inside catch will run
      console.log(err);
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }
}

export default SignUpForm;
