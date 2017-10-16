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
        <Image source={require('./assets/user_icon.png')}
          style={{width: 120, height: 120, alignSelf: 'center'}}/>
        <StyledButton
          style={{marginTop: 20}}
          title={`Change Picture`}
          />
        <StyledTextInput
          labelText={`Name`}
          value={this.state.name}
          onChangeText={(name) => this.setState({name})} />
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
