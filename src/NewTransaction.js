import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Picker,
  ScrollView
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import StyledPicker from './components/StyledPicker'
import ControlBanner from './components/ControlBanner'
import TransactionEntry from './components/TransactionEntry'

export default class NewTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      category: undefined,
      amount: '',
      budget: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.budget,
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)

    this.makeTransactionFunc = this.makeTransactionFunc.bind(this)

  }

  //Select buttons
  async budgetButtonPress(){
    //this is a placeholder until we get Hamburger running
    console.log('pickBudget')
    this.props.navigation.navigate('PickBudget', {returnBudget: this.returnBudget.bind(this)})
  }
  async categoryButtonPress(){
    this.props.navigation.navigate('PickCategory', {returnCategory: this.returnCategory.bind(this)})
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //this is a placeholder until we get Hamburger running
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    //already at transaction so leave empty
    //this.props.navigation.navigate('NewTransaction')
  }

  //EDITINGBANNER buttons
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.navigate('Budget', {budget: this.state.budget})
  }

  async yButtonPress() {
    console.log(JSON.stringify(this.state.category))
    if(this.state.category == undefined || this.state.budget == undefined || this.state.budget.name == "Select One" || this.state.category.name === "Select One") {
      console.log("I am here")
      Alert.alert(
        'Invalid Request',
        'Please select a category!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      return;
    }
    let endpoint = "/budgets/" + this.state.budget._id + "/categories/" + this.state.category.slug + "/transactions"
    console.log(endpoint)
    let { resp, error } = await API.build().authenticated().post({
        //enter endpoint once configured
        //how to fill the body using a vector of entries
        endpoint: endpoint,
        body: {
          "description": this.state.description,
          "recurring": false,
          "name":this.state.name,
          "recurring_days": 0,
          "amount": this.state.amount,

        }
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
        this.props.navigation.navigate('Budget', {budget: this.state.budget})
      }
  }

  //Helper classes to receive selected Category/Budget
  async returnBudget(budg) {
    this.setState({budget: budg});
    console.log(this.state.budget)
  }
  async returnCategory(cat) {
    this.setState({category: cat});
    console.log(this.state.category)
  }

  makeTransactionFunc(key, value) {
    var local_state = {};
    local_state[key] = value;
    this.setState(local_state)

  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
        <EditingBanner
          header = {'New Transaction'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <ScrollView>
          <View style={{padding: 10}}>
            <TransactionEntry budget= {this.state.budget} makeTransaction={this.makeTransactionFunc}/>
          </View>
        </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
