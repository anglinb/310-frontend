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

export default class AccountSetUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    }
    //this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  render() {
    return (
      <Container avoidKeyboard={true} centerContent={true}>
        <Image source={require('./assets/Logo.png')}
          style={{width: 100, height: 100, alignSelf: 'center'}}/>
        <StyledTextInput
          labelText={`Email`}
          value={this.state.email}
          secureTextEntry={true}
          onChangeText={(email) => this.setState({email})} />
        <StyledButton
          style={{marginTop: 20}}
          title={`Save`}
          />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
