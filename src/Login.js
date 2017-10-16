import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';

import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import Container from './components/Container'
import API from './lib/API'

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  async handleButtonPress() {
    let { resp, error } = await API.build().post({
      endpoint: '/authenticate',
      body: {
        username: this.state.email,
        password: this.state.password,
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
      console.log('SUCCESS!!!!!!!!!')
    }
  }

  render() {
    return (
      <Container avoidKeyboard={true} centerContent={true}>
        <StyledTextInput
          labelText={`Email`}
          value={this.state.email}
          onChangeText={(email) => this.setState({email})} />
        <StyledTextInput
          labelText={`Password`}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})} />
        <StyledButton
          style={{marginTop: 20}}
          title={`Login/Sign Up`}
          onPress={this.handleButtonPress}/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
