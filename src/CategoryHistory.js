import React from 'react';
import Moment from 'moment';
import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import Container from './components/Container'
import BudgetHelper from './lib/BudgetHelper.js'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import TransactionRow from './components/TransactionRow'
import CategoryHistoryPeriod from './components/CategoryHistoryPeriod'

export default class CategoryHistory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      archives: [],
      budget: props.navigation.state.params.budget || null,
      slug: props.navigation.state.params.slug,
    }
    let budgetName
    let categoryName
    var nextDate
    var prevDate
    var nextDateString
    var prevDateString
  }

  async componentDidMount() {
    let { resp, error } = await API.build().authenticated().get({
      endpoint: `/budgets/${this.state.budget._id}/archives`
    })

    this.setState({ archives: resp })
  }


  render() {
    budgetName = this.state.budget.name
    let budgetHelper = new BudgetHelper(this.state.budget)

    if(this.state.budget.categories.length > 0) {
      let correctCategory = this.state.budget.categories.filter((category) => { return category.slug === this.state.slug })
      categoryName = correctCategory.length > 0 ? correctCategory[0].name : ''
    }
    else {
      categoryName = ''
    }

    nextDate = budgetHelper.nextResetDate()
    prevDate = budgetHelper.previousResetDate()

    return(
      <Container>
        <View style={{padding:10}}/>
        <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
          <Text style={styles.title}>{budgetName} | </Text>
          <Text style={styles.subtitle}>{categoryName}</Text>
        </View>
        <ScrollView>
          <CategoryHistoryPeriod
            slug={this.state.slug}
            budget={this.state.budget}
            archives={this.state.archives}
            nextDate={nextDate}
            prevDate={prevDate}
            increment={0}/>
          <CategoryHistoryPeriod
            slug={this.state.slug}
            budget={this.state.budget}
            archives={this.state.archives}
            nextDate={nextDate}
            prevDate={prevDate}
            increment={1}/>
          <CategoryHistoryPeriod
            slug={this.state.slug}
            budget={this.state.budget}
            archives={this.state.archives}
            nextDate={nextDate}
            prevDate={prevDate}
            increment={2}/>
          <CategoryHistoryPeriod
            slug={this.state.slug}
            budget={this.state.budget}
            archives={this.state.archives}
            nextDate={nextDate}
            prevDate={prevDate}
            increment={3}/>
          <CategoryHistoryPeriod
            slug={this.state.slug}
            budget={this.state.budget}
            archives={this.state.archives}
            nextDate={nextDate}
            prevDate={prevDate}
            increment={4}/>
          <CategoryHistoryPeriod
            slug={this.state.slug}
            budget={this.state.budget}
            archives={this.state.archives}
            nextDate={nextDate}
            prevDate={prevDate}
            increment={5}/>
        </ScrollView>
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
