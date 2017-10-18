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

export default class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  async handleButtonPress() {
    let { resp, error } = await API.build().post({
      endpoint: '/authenticate/reset/request',
      body: {
        username: this.state.email,
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
    } else {
      await this.props.navigation.navigate('PasswordToken', {email: this.state.email})
    }
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
          <Text style={styles.headerText}>{`Enter your email to be sent a verification code.`}</Text>
          <StyledTextInput
            labelText={`Enter Your Email`}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})} />
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
