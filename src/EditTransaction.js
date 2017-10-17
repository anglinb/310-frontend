import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  ScrollView,
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import ControlBanner from './components/ControlBanner'

export default class EditTransaction extends React.Component {

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
    this.props.navigation.navigate('NewTransaction')
  }

  //BUTTON CONTROLS
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }

  async yButtonPress() {
    let { resp, error } = await API.build().post({
        //get handle
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

  async deleteButtonPress() {
    let { resp, error } = await API.build().post({
        //get handle
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
          header = {'Edit Transaction'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <View style={{padding: 10}}>
          <ScrollView>
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
            <StyledButton
                style={{marginTop: 10}}
                title={`Delete Transaction`}
                onPress={this.deleteButtonPress}
            />
          </ScrollView>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
