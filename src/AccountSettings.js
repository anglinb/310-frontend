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

import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import Container from './components/Container'
import API from './lib/API'
import EditingBanner from './components/EditingBanner'
import ControlBanner from './components/ControlBanner'

export default class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      img: './assets/user_icon.png',
    }
    this.photoButtonPress = this.photoButtonPress.bind(this)
    this.notificationButtonPress = this.notificationButtonPress.bind(this)
    this.pinButtonPress = this.pinButtonPress.bind(this)
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
    console.log('navigate to transaction')
    this.props.navigation.navigate('NewTransaction')
  }

  //OTHER buttons
  async photoButtonPress(){
    console.log('navigate to camera roll')
    this.props.navigation.navigate('CameraRoll')
  }
  async notificationButtonPress(){
    this.props.navigation.navigate('NotificationSettings', {name: 'Lucy'})
  }
  async pinButtonPress(){

  }

  //EDITINGBANNER buttons
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }
  async yButtonPress() {
    let { resp, error } = await API.build().post({
        //how do you get the Budget ID?
        endpoint: '/budgets/{budgetId}/categories/{categorySlug}',
        body: {
          email: this.state.email,
          name: this.state.name,
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
        //navigate back a page
        this.props.navigation.goBack()
      }
  }

  //Used as a GET call for the accounts imgage
  getImg(){
    //else
    //this.state.img
  }

  render() {
    //this.state.img = this.getImg()
    return (
      <Container style={{ padding: 0 }}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
        <EditingBanner
          header = {'Account Settings'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <View style={{padding: 10}}>
          <StyledTextInput
              labelText={`Email`}
              value={this.state.email}
              secureTextEntry={false}
              onChangeText={(email) => this.setState({email})} />
          <StyledButton
            style={{marginTop: 7, padding: 5}}
            title={`Change Notifications`}
            onPress={this.notificationButtonPress}
            />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
