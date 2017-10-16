import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Image,
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import ControlBanner from './components/ControlBanner'

export default class HamburgerNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
    this.budgetsButtonPress = this.budgetsButtonPress.bind(this)
    this.archivesButtonPress = this.archivesButtonPress.bind(this)
    this.accountButtonPress = this.accountButtonPress.bind(this)
    this.signOutButtonPress = this.signOutButtonPress.bind(this)
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //does nothing here because it is already navigated here
  }
  async transactionButtonPress(){
    console.log('navigate to transaction')
    this.props.navigation.navigate('NewTransaction')
  }

  //navigation buttons
  async budgetsButtonPress() {
    //navigate back a page
    this.props.navigation.navigate('Budget', {name: 'Lucy'})
  }
  async archivesButtonPress() {
    this.props.navigation.navigate('NewCategory')
  }
  async accountButtonPress() {
    this.props.navigation.navigate('AccountSettings')
  }
  async signOutButtonPress() {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
        />
        <View style={{padding: 10}}>
            <StyledButton
              style={{marginTop: 20}}
              title={`Budgets`}
              onPress={this.budgetsButtonPress}
            />
            <StyledButton
              style={{marginTop: 20}}
              title={`Archives`}
              onPress={this.archivesButtonPress}
            />
            <StyledButton
              style={{marginTop: 20}}
              title={`Account Settings`}
              onPress={this.accountButtonPress}
            />
            <StyledButton
              style={{marginTop: 20}}
              title={`Sign Out`}
              onPress={this.signOutButtonPress}
            />
        </View>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
});
