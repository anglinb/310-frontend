import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Container from './components/Container'
import Store from './lib/Store'
import config from './config'

export default class Splash extends React.Component {

  async componentDidMount() {
    //Store.authenticationStore().removeAuthenticationToken()
    let authenticationStore = Store.authenticationStore()
    let token = await authenticationStore.getAuthenticationToken()
    console.log('TOKEN: ', token)
    if (!token) {
      this.props.navigation.navigate('UnautherWrapper')
    } else {
      this.props.navigation.navigate('AuthenticatedWrapper')
    }
  }

  render() {
    return (
      <Container style={{padding: 0, backgroundColor: config.lightGreen }}>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
