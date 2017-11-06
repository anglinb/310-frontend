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
import NotificationsHelper from './lib/NotificationsHelper'
import CategoryHelper from './lib/CategoryHelper'
import TransactionRow from './components/TransactionRow'

export default class NewTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      category: undefined,
      amount: '',
      budget: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.budget,
      transactions: [{
        description: 'test',
        recurring: false,
        name: 'name',
        recurring_days: 0,
        amount: 10,
      //  budget: this.state.budget,
      //  category: this.state.category.slug,
      }],
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
    this.addAnotherTransaction = this.addAnotherTransaction.bind(this)
    this.validate = this.validate.bind(this)
    this.renderTransactionEntry = this.renderTransactionEntry.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.onValueChangeBudget = this.onValueChangeBudget.bind(this)

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
    // this.props.navigation.navigate('Budget', {budget: this.state.budget})
    this.props.navigation.goBack()
  }

  async yButtonPress() {

    this.validate()

    let notifHelper = new NotificationsHelper({ budget: this.state.budget })
    let preThresh = notifHelper.calculateSingleThreshold(this.state.category)
    let categoryBudget1 = new CategoryHelper(this.state.category);
    let usePre = categoryBudget1.categoryBudgetUsed();

    console.log('THE AMOUNT BEFORE', usePre);
    console.log('PRE', preThresh);
    let endpoint = "/budgets/" + this.state.budget._id + "/categories/" + this.state.category.slug + "/transactions"
    let { resp, error } = await API.build().authenticated().post({
        //enter endpoint once configured
        //how to fill the body using a vector of entries
        endpoint: endpoint,
        body: {
          description: this.state.description,
          recurring: false,
          name:this.state.name,
          recurring_days: 0,
          amount: this.state.amount,
        }
      })
      console.log('UPPPPPPPPPPPPPPPPPPPPPPPPPPAAADDDDDDDDDDDDDDDDDD')


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
        if(this.props.navigation.state.params && this.props.navigation.state.params.updateBudget !== undefined) {
          await this.props.navigation.state.params.updateBudget()
        }
        this.props.navigation.goBack()
      }
      // let postThresh = notifHelper.calculateSingleThreshold(this.state.category)
      // console.log('POST', postThresh);
      let categoryBudget2 = new CategoryHelper(this.state.category);
      let usePost = categoryBudget2.categoryBudgetUsed();
      let totalBuj = categoryBudget2.categoryBudgetAmount();
      let amt = this.state.amount
      usePost=parseInt(usePost)+parseInt(amt);
      //console.log('THE AMOUNT AFTER', usePost);
      let newRat = 0;
      let oldRat = categoryBudget2.categoryBudgetPercentage();
      if (usePost > 0) {
        newRat = (usePost / totalBuj)
      }
      oldRat=parseInt(oldRat)/100;

      for (var i = notifHelper.getThreshHolds().length-1; i >=0 ; i--) {
        if(newRat >= 1){
          Alert.alert(
            'Full Budget Limit Reached',
            'You have exceeded your budget limitation by ' + (newRat-1)*100 + '% in your ' + this.state.category.name + ' Category!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
        if (newRat >= notifHelper.getThreshHolds()[i] && oldRat < notifHelper.getThreshHolds()[i]){
          let pc = notifHelper.getThreshHolds()[i];
          //console.log("SHOW A NOTIFICATION-THRESHOLD REACHED");
          Alert.alert(
            'Budget Threshold Reached',
            'You have reached ' + notifHelper.getThreshHolds()[i]*100 + '% in your ' + this.state.category.name + ' Category!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
      }


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
    if(this.state.category == undefined || this.state.budget == undefined || this.state.budget.name == "Select One" || this.state.category.name === "Select One") {
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
    if(this.state.amount < 0) {
      Alert.alert(
        'Bad Request',
        'Amount is negative',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      return;
    }
  }

  //Helper classes to receive selected Category/Budget
  async returnBudget(budg) {
    this.setState({budget: budg});
  }
  async returnCategory(cat) {
    this.setState({category: cat});
  }

  addAnotherTransaction() {
    let transactionObject = {
      description: this.state.description,
      recurring: false,
      name:this.state.name,
      recurring_days: 0,
      amount: this.state.amount,
      budget: this.state.budget,
      category: this.state.category.slug,
    }

    let newTransactions = this.state.transactions
    newTransactions.push(transactionObject)

    this.setState({
      transactions:newTransactions,
      description: '',
      name: '',
      amount: '',
      budget: undefined,
      cateogry: undefined,
    })

  }

  onValueChange(value) {

    this.setState({
      category:JSON.parse(value)
    })
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

  renderTransactionEntry() {
      let selectOneObject = {"name": "Select One", "identifier":"dummy"}
      const curr_budgets = this.state.budgets || [selectOneObject]

      let curr_cats = (this.state.selectedBudget) ? this.state.selectedBudget.categories : [selectOneObject]
      if (curr_cats.length == 0)
        curr_cats.push(selectOneObject)
      if(!(curr_cats[0].identifier ==="dummy")) {
        curr_cats.unshift(selectOneObject)
      }

      if(!(curr_budgets[0].identifier ==="dummy")) {
        curr_budgets.unshift(selectOneObject)
      }

      return (
          <View style={{padding: 10}}>
            <StyledTextInput
              labelText={'Transaction Name'}
              value={this.state.name}
              onChangeText={(name) => {this.setState({ name })}}
              accessible={true} accessibilityLabel={'name-transaction'} />
            <StyledTextInput
                labelText={`Description`}
                value={this.state.description}
                onChangeText={(description) => {this.setState({ description })}}
                accessible={true} accessibilityLabel={'description-transaction'}/>
            <StyledTextInput
                labelText={`Amount`}
                value={this.state.amount}
                onChangeText={(amount) => {this.setState({ amount })}}
                accessible={true} accessibilityLabel={'amount-transaction'}/>
            <StyledPicker
                labelText={`Budget`}
                objects={curr_budgets}
                onValueChange={this.onValueChangeBudget}
                 />
            <StyledPicker
                labelText={`Category`}
                objects={curr_cats}
                onValueChange={this.onValueChange}
                 />

          </View>
      )
  }

  renderTransactions() {
    return (
      <View>
      {this.state.transactions.map((transaction) => {
        return <TransactionRow  key={`${transaction.name}${transaction.description}${transaction.amount}`} transaction={transaction}/>
      })}
      </View>

    )
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
        <ScrollView accessible={true} accessibilityLabel={'transaction-entry-container'}>
        <Text style={StyleSheet.flatten([styles.headerText, { padding: 10 }])}>{`Added Transactions`}</Text>
        {this.renderTransactions()}
          <View style={{padding: 10}}>
            {this.renderTransactionEntry()}
            <StyledButton title={`Add Another Transaction`} onPress={this.addAnotherTransaction}/>
          </View>
        </ScrollView>
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
});
