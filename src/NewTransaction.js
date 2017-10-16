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
import ControlBanner from './components/ControlBanner'

export default class NewTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      budget: '',
      category: '',
      amount: '',
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //this is a placeholder until we get Hamburger running
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    //already at transaction so leave empty
    //this.props.navigation.navigate('NewTransaction')
  }

  //EDITINGBANNER buttons
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
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
        <EditingBanner
          header = {'New Transaction'}
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
