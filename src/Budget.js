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
    this.state = {'budget':this.props.navigation.state.params.budget}
  }
  async componentDidMount() {

  }

  render() {


    return (
      <Container style={{padding: 0}}>
        <View style={styles.leftRight}>
          <Text style={styles.headerText}>{this.state.budget.name}</Text>
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
