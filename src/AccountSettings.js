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
    }
    //this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  render() {
    return (
      <Container avoidKeyboard={true} centerContent={true}>
        <EditingBanner
          header = {'Account Settings'}
          />
        <Image source={require('./assets/user_icon.png')}
          style={{width: 120, height: 120, alignSelf: 'center', marginTop: 10}}/>
        <StyledButton
          style={{marginTop: 10, padding: 5}}
          title={`Change Picture`}
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
          />
        <StyledButton
          style={{marginTop: 7, padding: 5}}
          title={`Change PIN`}
          />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
