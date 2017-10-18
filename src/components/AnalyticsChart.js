import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  ListView
} from 'react-native';

import Container from '../components/Container'
import BudgetHelper from '../lib/BudgetHelper.js'
import API from '../lib/API'
import Store from '../lib/Store'
import config from '../config'
import PieChart from 'react-native-pie-chart'


export default class AnalyticsChart extends React.Component {

  render() {
    const chart_wh = 250
    let name
    let length
    let budgetHelper
    let totalAmount
    let amounts = new Array();
    let legend = new Array();
    // can only handle 10 for now
    let colors = ['#b5e3dd', '#7ecdc3', config.darkerGreen, '#40a598', '#399387','#347f76', '#2c6d65', '#255b54', '#1e4843', '#000']

    if(this.props.budget) {
      name = this.props.budget.name
      if(typeof this.props.budget.categories !== 'undefined') {
        budgetHelper = new BudgetHelper(this.props.budget)
        totalAmount = budgetHelper.budgetAmount()
        length = this.props.budget.categories.length
        for(var i = 0; i < length; i++) {
          amounts.push(this.props.budget.categories[i].amount)
          legend.push(<View key={i} style={{flexDirection:'row', justifyContent: 'space-between', left:-20}}>
              <Text style={{color: colors[i], fontWeight: '600', fontSize: 13}}>
                {this.props.budget.categories[i].name}: ${this.props.budget.categories[i].amount}
              </Text>
              <Text style={{color: colors[i], fontWeight: '600', fontSize: 13, right:-30}}>
                {((this.props.budget.categories[i].amount/totalAmount)*100).toFixed(2)}%
              </Text>
          </View>)
        }
      }
      else {
        totalAmount = 0
      }
    }
    else {
      name = ''
    }
    return (
      <Container style={{padding:0}}>
      <View>
        <Text style={styles.headerText}>{name}</Text>
        <Text>Total Amount: ${totalAmount}</Text>
        <View style={{padding:10}}/>
        <PieChart
            chart_wh={chart_wh}
            series={amounts}
            sliceColor={colors}
            doughnut={true}
          />
        <View style={{padding:10}}/>
        <View>{ legend }</View>
      </View>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  headerText: {
    color: config.veryDarkText,
    fontSize: 25,
    fontWeight: '600',
  }
});
