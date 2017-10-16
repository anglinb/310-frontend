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

export default class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      img: './assets/Logo.png',
    }
    this.photoButtonPress = this.photoButtonPress.bind(this)
    this.notificationButtonPress = this.notificationButtonPress.bind(this)
    this.pinButtonPress = this.pinButtonPress.bind(this)
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
  }

  //BUTTON CONTROLS
  async photoButtonPress(){
    this.props.navigation.navigate('CameraRoll')
  }
  async notificationButtonPress(){
    this.props.navigation.navigate('NotificationSettings', {name: 'Lucy'})
  }
  async pinButtonPress(){

  }
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.navigate('Budget', {name: 'Lucy'})
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
        this.props.navigation.navigate('Budget', {name: 'Lucy'})
      }
  }

  //Used as a GET call for the accounts imgage
  getImg(){
    //this.state.img =
  }

  render() {
    getImg()
    return (
      <Container avoidKeyboard={true} centerContent={true}>
        <EditingBanner
          header = {'Account Settings'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <Image source={require(this.img)}
          style={{width: 120, height: 120, alignSelf: 'center', marginTop: 10}}/>
        <StyledButton
          style={{marginTop: 10, padding: 5}}
          title={`Change Picture`}
          onPress={this.photoButtonPress}
          />
        <StyledTextInput
          labelText={`Name`}
          value={this.state.name}
          onChangeText={(name) => this.setState({name})} />
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
        <StyledButton
          style={{marginTop: 7, padding: 5}}
          title={`Change PIN`}
          onPress={this.pinButtonPress}
          />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
