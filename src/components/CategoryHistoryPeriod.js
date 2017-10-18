import React from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import Container from '../components/Container'
import BudgetHelper from '../lib/BudgetHelper.js'
import API from '../lib/API'
import Store from '../lib/Store'
import config from '../config'
import TransactionRow from '../components/TransactionRow'

export default class CategoryHistoryPeriod extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillReceiveProps(nextProps) {
    let budget
    console.log('archives length ', nextProps.archives.length)
    console.log('increment  ', nextProps.increment)
    if (nextProps.increment == 0) {
      console.log('increment 0')
      budget = this.props.budget
    }
    else if (nextProps.archives.length >= nextProps.increment) {
      console.log('getting into archives')
      console.log(nextProps.archives[0])
      budget = nextProps.archives[nextProps.increment-1]
    }
    this.setState({ budget })
  }

  render() {

    let transactions = new Array()
    var tempPrevDate = moment(prevDate)
    var tempNextDate = moment(nextDate)
    var nextDateString
    var prevDateString

    if(this.props.budget.resetType == 'MONTH') {
      console.log('here for months', this.props.budget.resetType)
      tempPrevDate.subtract(this.props.increment, 'months')
      tempNextDate.subtract(this.props.increment, 'months')
      var tPrevDate = new Date(tempPrevDate)
      var tNextDate = new Date(tempNextDate)
      nextDateString = tNextDate.getMonth()+ "/" + tNextDate.getDate()
      prevDateString = tPrevDate.getMonth() + "/" + tPrevDate.getDate()
    }
    else {
      console.log('here for weeks', this.props.budget.resetType)
      tempPrevDate.subtract(this.props.increment, 'weeks')
      tempNextDate.subtract(this.props.increment, 'weeks')
      var tPrevDate = new Date(tempPrevDate)
      var tNextDate = new Date(tempNextDate)
      nextDateString = tNextDate.getMonth()+ "/" + tNextDate.getDate()
      prevDateString = tPrevDate.getMonth() + "/" + tPrevDate.getDate()
    }

    if(this.state.budget) {
      console.log('in state budget w BUDGET ', this.state.budget)
      let category
      let categories = this.state.budget.categories.filter((category) => { return category.slug === this.props.slug })
      console.log('in state budget w slug ', this.props.slug)
      console.log('length of categories', categories.length)
      if (categories.length > 0) {
        console.log('transaction')
          category = categories[0]
          for(var i = 0; i < category.transactions.length; i++) {
            console.log(category.transactions[i].timestamp)
            transactions.push(<TransactionRow key={i} transaction={category.transactions[i]} date={prevDateString}/>)
          }
      }
    }


    return(
      <Container>
      <View style={{padding:3}}/>
      <View>
        <Text style={styles.subsubtitle}>{prevDateString} - {nextDateString}</Text>
      </View>
      <View style={{padding:3}}/>
      <View>{ transactions }</View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: config.textGreen,
    fontSize: 20,
    fontWeight: '500',
    padding:0
  },
  subtitle: {
    color: config.darkerGreen,
    fontSize: 20,
    fontWeight: '500',
    padding:0
  },
  subsubtitle: {
    color: config.darkerGreen,
    fontSize: 15,
    fontWeight: '500',
    padding:0
  }
});
