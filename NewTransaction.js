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

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'

export default class NewTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      budget: '',
      category: '',
      amount: '',
      language: 'java',
    }
  }

  render() {
    return (
      <Container style={{padding: 0, alignItems: 'left'}}>
        <EditingBanner
          header = {'New Transaction'}
          />
        <View style={{padding: 10, alignItems: 'left'}}>
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
          <Picker
            style={{height:30, width:100}}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <StyledButton
              style={{marginTop: 20}}
              title={`Save Transaction`}
          />

        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
