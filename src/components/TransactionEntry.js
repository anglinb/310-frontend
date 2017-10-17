import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Picker
} from 'react-native';


import config from '../config'
import StyledTextInput from './StyledTextInput'
import StyledButton from './StyledButton'
import StyledPicker from './StyledPicker'

export default class NewTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      budget: '',
      category: '',
      amount: '',
    }
  }

  render() {
    return (
        <View style={{padding: 10}}>
          <StyledTextInput
            labelText={'Transaction Name'}
            value={this.state.name}
            onChangeText={(name) => this.setState({name})} />
          <StyledTextInput
              labelText={`Budget`}
              value={this.state.budget}
              onChangeText={(budget) => this.setState({budget})} />
          <StyledTextInput
              labelText={`Category`}
              value={this.state.category}
              onChangeText={(category) => this.setState({category})} />
          <StyledTextInput
              labelText={`Amount`}
              value={this.state.amount}
              onChangeText={(amount) => this.setState({amount})} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: config.veryDarkText,
    fontSize: 20,
    fontWeight: '600',
  }
});
