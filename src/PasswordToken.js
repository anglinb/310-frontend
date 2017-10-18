import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Image
} from 'react-native';

import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import Container from './components/Container'
import API from './lib/API'
import Store from './lib/Store'
import EditingBanner from './components/EditingBanner'
import config from './config'

export default class PasswordToken extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.email,
      passwordResetToken: '',
      password: '',
    }
    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  async handleButtonPress() {
    /*let { resp, error } = await API.build().post({
      endpoint: '/authentication/reset/complete',
      body: {
        username: this.state.email,
        passwordResetToken: this.state.passwordResetToken,
        password: this.state.password,
      }
    })
    if (error !== null) {
      Alert.alert(
        'Whoops!',
        error.message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {*/
      await this.props.navigation.navigate('Login')
    //}
  }

  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Container avoidKeyboard={true} style={{padding: 0}}>
        <Image source={require('./assets/Logo.png')}
          style={{width: 120, height: 40, alignSelf: 'center', marginTop: 10}}/>
        <EditingBanner
          header = {'Change Password'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.handleButtonPress()}}
          />
        <View style={{padding: 10}}>
          <Text style={styles.headerText}>{`You have been sent an email with a 6 digit code. Please enter the code and your new password below.`}</Text>
          <StyledTextInput
            labelText={`6-Digit Code`}
            value={this.state.passwordResetToken}
            onChangeText={(passwordResetToken) => this.setState({passwordResetToken})} />
          <StyledTextInput
            labelText={`New Password`}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})} />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: config.veryDarkText,
    fontSize: 14,
    fontWeight: '600',
  }
});
