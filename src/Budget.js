import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';

import Container from './components/Container'
import BudgetBanner from './components/BudgetBanner'
import BudgetStatusBar, { BudgetStatusBarDates } from './components/BudgetStatusBar'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'

export default class Budget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    // This would happen in the login component
    let authStore = Store.authenticationStore()

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWUzZmU3MWJjZTQxMDU2YmY0ZGViN2YiLCJpYXQiOjE1MDgxMjg5MzJ9.mhXVwZ888TPiOCS0YRh94NP2Wd6rs3spZauVQQtYUR8'
    await authStore.setAuthenticationToken(token)


    let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets/59e409b032d1c0c0a9eefd64'
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
        budget: resp
      })
    }
  } 

  render() {


    return (
      <Container style={{padding: 0}}>
        <View style={styles.leftRight}>
          <Text style={styles.headerText}>{this.state.budget ? this.state.budget.name : `Loading...`}</Text>
          <Button onPress={()=> {}} title={`Edit`} />
        </View>
        <BudgetBanner
          budget={this.state.budget}
          />
        <BudgetStatusBarDates
          budget={this.state.budget}
          />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: config.veryDarkText,
    fontSize: 20,
    fontWeight: '600',
  },
  leftRight: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
