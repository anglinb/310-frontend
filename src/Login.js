import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Text,
  View
} from 'react-native';

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
    try {
      let resp = await fetch('http://localhost:3000/authenticate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
        })
      })
      let payload = await resp.json()
      console.log('PAYLOAD', payload)
      if (payload.error) {
        Alert.alert(
          'Whoops!',
          payload.error.msg,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
     <KeyboardAvoidingView style={styles.container}  behavior="padding">
        <TextInput
          style={styles.textInput}
          value={this.state.email}
          onChangeText={(email) => this.setState({email})} />
        <TextInput
          style={styles.textInput}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})} />
        <Button
          title={`Login/Sign Up`}
          onPress={this.handleButtonPress}/>
        </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'red',
    borderWidth: 2,
    width: 200,
  }
});
