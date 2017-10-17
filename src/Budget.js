import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';
import Hr from 'react-native-hr';

import Container from './components/Container'
import BudgetBanner from './components/BudgetBanner'
import BudgetStatusBar, { BudgetStatusBarDates, BudgetStatusBarCategory } from './components/BudgetStatusBar'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import ControlBanner from './components/ControlBanner'
import TransactionRow from './components/TransactionRow'
export default class Budget extends React.Component {

   constructor(props) {

    super(props);
    this.state = {
      budget: props.navigation.state.params.budget || null,
      isEditing: false,
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
    this.props.navigation.navigate('NewTransaction', { budget: this.state.budget})
  }

  async editButtonPress(){
    console.log('EditingBudget')
    this.props.navigation.navigate('EditBudget')
  }

   async componentDidMount() {
     await this.state.budget._id !=null
     const endpoint = "/budgets/" + this.state.budget._id
    let { resp, error } = await API.build().authenticated().get({
      endpoint: endpoint
    })
    if (error) {
      Alert.alert(
        'Error',
        error.message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {
      this.setState({ budget: resp })
    }

  }



  render() {
    let transactions = this.state.budget.categories.map((category, index) => {
      return category.transactions.map((transaction, index) => {
        return <TransactionRow transaction={transaction} />
      })
    })
    let categories = this.state.budget.categories.map((category, index) => {
      return <BudgetStatusBarCategory key={category.slug} category={category} />
    })
    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
        <View style={styles.leftRight}>
          <Text style={styles.headerText}>{this.state.budget ? this.state.budget.name : `Loading...`}</Text>
          <Button onPress={this.editButtonPress} title={`Edit`} />
        </View>
        <BudgetBanner
          budget={this.state.budget}
          />
        <BudgetStatusBarDates
          budget={this.state.budget}
          />
          <View  style={{marginTop: 10, marginBottom: 10, height: 1, backgroundColor: config.darkText }}></View>
          <Text style={StyleSheet.flatten([styles.headerText, { padding: 10 }])}>{`Categories`}</Text>
          <View>
            {categories}
          </View>
          <View  style={{marginTop: 10, marginBottom: 10, height: 1, backgroundColor: config.darkText }}></View>
          <Text style={StyleSheet.flatten([styles.headerText, { padding: 10 }])}>{`Recent Transactions`}</Text>
          {transactions}
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
