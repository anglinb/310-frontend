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
    super(props)
    this.state = {}
  }

  async componentDidMount() {

    let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets/59e44f476755474d3ae60bb8'
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
      setTimeout(() => {
      this.setState({
        budget: resp
      })

      }, 1000)
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
