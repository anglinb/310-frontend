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
import ControlBanner from './components/ControlBanner'

export default class Budget extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
    }
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //this is a placeholder until we get Hamburger running
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    console.log('navigate to transaction')
    this.props.navigation.navigate('NewTransaction')

  }


   componentDidMount() {
    let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets/59e3ff07bce41056bf4deb81'
    })
    console.log('FLJEWLJFEWJL resp', resp)
    console.log('FLJEWLJFEWJL error', error)
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
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
