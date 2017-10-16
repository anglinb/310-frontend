import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View, TouchableOpacity
} from 'react-native';
import BudgetBanner from './BudgetBanner'
import BudgetStatusBar from './BudgetStatusBar'
import Container from './Container'

export default class BudgetWidget extends React.Component {

  constructor(props) {
    super(props);
    this._onPressBudget = this._onPressBudget.bind(this)
    //this.stringDate = this.stringDate.bind(this)
  }



  async _onPressBudget() {
    const { navigate } = this.props.navigation
    navigate('Budget', { budget: this.props.budget})
  }


  /*stringDate(date) {
    return (date.getMonth()+1) + "/" + date.date
  }*/
  render() {

      //date resetter
      let dateReset = new Date()

      let currentDate = new Date()
      let resetDateNumber = this.props.budget.item.resetDate
      dateReset.setDate(resetDateNumber)
      let dateBegin = new Date(dateReset)

      if(currentDate.getDate()>resetDateNumber)
        dateReset.setDate(dateReset.getMonth() + 1)

      if(this.props.budget.item.resetType == 'WEEK') //weekly
        dateBegin.setDate(dateReset.getDate() - 7)
      else  //monthly
        dateBegin.setDate(dateReset.getMonth() -1)

      var result = this.props.budget.item.categories.reduce(function(accumulator, currentValue) {
        let transactionsValue = currentValue.transactions.reduce(function(t_accumulator, t_currentValue) {
          return t_accumulator + t_currentValue.amount;
        }, 0);

        let obj = accumulator
        obj.totalBudget = obj.totalBudget + currentValue.amount
        obj.transactionsValue = obj.transactionsValue + transactionsValue
        obj.transactions = obj.transactions + currentValue.transactions.length
        return obj
    }, {"totalBudget":0, "transactionsValue":0, "transactions":0});


    let totalValue_String = "$" + result.transactionsValue + "/" + result.totalBudget
    let dateReset_String =   (dateReset.getMonth()+1) + "/" + dateReset.getDate()
    let dateBegin_String =   (dateBegin.getMonth()+1) + "/" + dateBegin.getDate()
    return (
      <TouchableOpacity onPress={this._onPressBudget}>
        <View style={styles.budgetView}>
          <View style={styles.titleSection}>
            <Text style={styles.title}> {this.props.budget.item.name}</Text>
          </View>
            <BudgetBanner
              budgetRatio={totalValue_String}
              resetDate={dateReset_String}
              transactions={result.transactions}
              />

            <BudgetStatusBar
              leftLabel={dateBegin_String}
              rightLabel={dateReset_String}
              />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  budgetView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 2},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginTop: 50,
    marginBottom: 50,
    marginRight: 25,
    marginLeft: 25,
    borderRadius: 10,
    /* Rectangle 10: */
    shadowOpacity: 0.18,
    borderRadius: 8,
    /* Rectangle 10: */
    backgroundColor: '#F0F4F3',
  },
  titleSection: {
    height: 50,
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 20,
    //borderColor: '#ccc',
    //borderWidth: 2,
  },
  title: {
    /* TA Stipend Budget: */
    fontFamily: 'Avenir',
    fontSize: 16,
    color: '#04BAB6',
    letterSpacing: 0,
    fontWeight:'bold',


  }
})
