import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Picker,
  ScrollView
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
import TransactionEntry from './components/TransactionEntry'

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
    this.anotherButtonPress = this.anotherButtonPress.bind(this)
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
        //how to fill the body using a vector of entries
        endpoint: '',
        body: {

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

  async anotherButtonPress(){

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
        <ScrollView>
          <View style={{padding: 10}}>
            <TransactionEntry/>
            <StyledButton
              style={{marginTop: 10}}
              title={`+ Another Transaction`}
              onPress={this.yButtonPress}
              />
            </View>
          </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
