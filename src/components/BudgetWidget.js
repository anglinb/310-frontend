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
import BudgetStatusBar, { BudgetStatusBarDates } from './BudgetStatusBar'
import Container from './Container'

export default class BudgetWidget extends React.Component {

  constructor(props) {
    super(props);
    this._onPressBudget = this._onPressBudget.bind(this)
  }

  async _onPressBudget() {
    const { navigate } = this.props.navigation
    navigate('Budget', { budget: this.props.budget})
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPressBudget}>
        <View style={styles.budgetView}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{this.props.budget.name}</Text>
          </View>
            <BudgetBanner
              budget={this.props.budget}
              />

            <BudgetStatusBarDates
              budget={this.props.budget}
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
