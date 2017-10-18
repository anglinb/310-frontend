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
    this.props.navigation.navigate('BudgetsPage')
  }
  async archivesButtonPress() {
    this.props.navigation.navigate('NewCategory')
  }
  async accountButtonPress() {
    this.props.navigation.navigate('AccountSettings')
  }
  async signOutButtonPress() {
    let authStore = Store.authenticationStore()
    await authStore.removeAuthenticationToken()
    await this.props.screenProps.rootNavigator.goBack()
    await this.props.screenProps.rootNavigator.navigate('UnautherWrapper')
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
        />
        <View style={{padding: 10}}>
            <Text style={styles.headerText}>{`Navigation Menu`}</Text>
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
  headerText: {
    color: config.veryDarkText,
    fontSize: 20,
    fontWeight: '600',
  }
});
