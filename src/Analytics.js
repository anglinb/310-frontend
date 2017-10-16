import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  ListView
} from 'react-native';

import Container from './components/Container'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import AnalyticsChart from './components/AnalyticsUI'

export default class Analytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    let authStore = Store.authenticationStore()

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWU0NDRhNmNhMTg2MTczNGRlZTU4YWMiLCJpYXQiOjE1MDgxODM4NDh9.pReqKKfRhhNColu9EaZ68gZrpn3Glf4H1vdoFkcVmlE'
    await authStore.setAuthenticationToken(token)

    let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets/59e4609ed5c9b3779ecf7cbd',
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
      this.setState({
        budget: resp,
      })
    }
  }

  render() {

    return (
      <Container style={styles.middle}>
      <View>
        <AnalyticsChart
          budget={this.state.budget}/>
      </View></Container>
    )
  }
}

const styles = StyleSheet.create({
  leftRight: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  middle: {
    padding: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
