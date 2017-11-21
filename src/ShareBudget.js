import React from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
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
import NotificationsHelper from './lib/NotificationsHelper'
import CategoryHelper from './lib/CategoryHelper'
import TransactionRow from './components/TransactionRow'
import MultipleTransactionRow from './components/MultipleTransactionRow'

export default class ShareBudget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      budget: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.budget,
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
    this.onValueChangeBudget = this.onValueChangeBudget.bind(this)
  }

  //Select buttons
  async budgetButtonPress(){
    //this is a placeholder until we get Hamburger running
    console.log('pickBudget')
    this.props.navigation.navigate('PickBudget', {returnBudget: this.returnBudget.bind(this)})
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    this.props.navigation.navigate('NewTransaction')
  }

  //EDITINGBANNER buttons
  async xButtonPress() {
    //navigate back a page
    // this.props.navigation.navigate('Budget', {budget: this.state.budget})
    this.props.navigation.goBack()
  }



  async yButtonPress() {
    console.log('GOT Y BUTTON fjldsjfldksl', this.state.transactions)
  }

  async componentDidMount() {
    let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets'
    })

    const budgetsList = resp.map((obj) => {
      obj.key = obj.name
      return obj;
    })

    this.setState({'budgets':budgetsList, 'selectedBudget':undefined})
  }

  validate() {
    if(this.state.name == undefined) {
      Alert.alert(
        'Invalid Request',
        'Please make sure the user exists!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      return false;
    }
    if(this.state.budget == undefined) {
      Alert.alert(
        'Bad Request',
        'Please select a budget to share',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      return false;
    }

    return true;
  }

  //Helper classes to receive selected Category/Budget
  async returnBudget(budg) {
    this.setState({budget: budg});
  }

  onValueChangeBudget(value) {

    this.setState({
      budget:JSON.parse(value)
    })
    let parsedValue = JSON.parse(value)

    let selectedBudget = undefined;
    if (parsedValue.identifier !== 'dummy') {
      selectedBudget = parsedValue
    }
    this.setState({"selectedBudget": selectedBudget})
  }

  onAmountChanged(text){
    let newText = '';
    let numbers = '0123456789.';

    if(text.length < 1){
       this.setState({ amount: '' });
     }

    for (var i=0; i < text.length; i++) {
         if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
         }
         else {
               // your call back function
               alert("Please enter numbers only.");
          }
         this.setState({ amount: newText });
     }
   }

  render() {
      let selectOneObject = {"name": "Select One", "identifier":"dummy"}
      const curr_budgets = this.state.budgets || [selectOneObject]

      if(!(curr_budgets[0].identifier ==="dummy")) {
        curr_budgets.unshift(selectOneObject)
      }

      return (
        <Container style={{padding: 0}}>
          <ControlBanner
            hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
            transactionButtonPress={() => {this.transactionButtonPress()}}
            />
          <EditingBanner
            header = {'Share a Budget'}
            xButtonPress={() => {this.xButtonPress()}}
            yButtonPress={() => {this.yButtonPress()}}
            />
          <View style={{padding: 10}}>
            <StyledTextInput
              labelText={'Enter User to Share to'}
              value={this.state.name}
              onChangeText={(name) => {this.setState({ name })}}
              accessible={true} accessibilityLabel={'name-transaction'} />
            <StyledPicker
                labelText={`Budget`}
                objects={curr_budgets}
                onValueChange={this.onValueChangeBudget}
                 />
          </View>
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
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
