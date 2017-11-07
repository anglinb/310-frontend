import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Picker,
  Switch
} from 'react-native';


import config from '../config'
import StyledTextInput from './StyledTextInput'
import StyledButton from './StyledButton'
import StyledPicker from './StyledPicker'
import API from './../lib/API'
export default class NewTransaction extends React.Component {

  //need to change the state to here for each transaction
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      category: undefined,
      amount: '',
      recurring: false,
      //budget: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.budget,
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.onValueChangeBudget = this.onValueChangeBudget.bind(this)
    this.state = {budgets:undefined, selectedBudget:undefined}
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

  handleChangeText(value, key) {

    this.props.makeTransaction(key, value)
  }

  onValueChange(value) {

    this.props.makeTransaction("category",JSON.parse(value))
  }

  onValueChangeBudget(value) {
    this.props.makeTransaction("budget",JSON.parse(value))
    let parsedValue = JSON.parse(value)

    let selectedBudget = undefined;
    if (parsedValue.identifier !== 'dummy') {
      selectedBudget = parsedValue
    }
    this.setState({"selectedBudget": selectedBudget})
  }

  render() {
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
            onChangeText={(name) => this.handleChangeText(name, "name")}
            accessible={true} accessibilityLabel={'name-transaction'} />
          <StyledTextInput
              labelText={`Description`}
              onChangeText={(description) => this.handleChangeText(description, "description")}
              accessible={true} accessibilityLabel={'description-transaction'}/>
          <StyledTextInput
              labelText={`Amount`}
              onChangeText={(amount) => this.handleChangeText(amount, "amount")}
              accessible={true} accessibilityLabel={'amount-transaction'}/>
          <View style={styles.leftRight}>
            <Text style={styles.headerText}>{`Recur Monthly:`}</Text>
            <Switch
              onValueChange={(value) => this.setState({recurring: value})}
              value={this.state.recurring}
              onTintColor={config.lightGreen}/>
          </View>
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
