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
import StyledPicker from './components/StyledPicker'

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

  async xButtonPress() {
    //navigate back a page
    this.props.navigation.navigate('Budget', {name: 'Lucy'})
  }

  async yButtonPress() {
    let { resp, error } = await API.build().post({
        //enter endpoint once configured
        endpoint: '',
        body: {
          name: this.state.name,
          budget: this.state.budget,
          category: this.state.category,
          amount: this.state.amount,
        }
      })
      if (error) {
        Alert.alert(
          'Whoops!',
          error.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      } else {
        this.props.navigation.navigate('Budget', {name: 'Lucy'})
      }
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <EditingBanner
          header = {'Edit Transaction'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
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
              style={{marginTop: 10}}
              title={`Save Transaction`}
              onPress={this.yButtonPress}
          />

        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
