import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'

export default class EditTransaction extends React.Component {

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
      <Container style={{padding: 0}}>
        <EditingBanner
          header = {'New Transaction'}
          />
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
          <StyledButton
              style={{marginTop: 20}}
              title={`Save Transaction`}
          />
          <StyledButton
              style={{marginTop: 20}}
              title={`Delete Transaction`}
          />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
