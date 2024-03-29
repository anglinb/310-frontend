import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import config from '../config'
import BudgetHelper from '../lib/BudgetHelper'
import CategoryHelper from '../lib/CategoryHelper'


export default class BudgetStatusBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let percentageComplete = this.props.percentageComplete || 0
    //console.log('PERCENTAGE COMPLETE: ', percentageComplete)
    if(percentageComplete == 0){
      let indicatorSpacerWidth = { flex: 100 }

      return (
        <View style={{ padding: 10}}>
          <View style={styles.leftRight}>
            <Text style={styles.labelText}>{this.props.leftLabel}</Text>
            <Text style={styles.labelText}>{this.props.rightLabel}</Text>
          </View>
          <View ref={`someView`}>
            <View style={StyleSheet.flatten([styles.bar, styles.darkBar])}></View>
            <View style={StyleSheet.flatten([styles.bar, {flexDirection: 'row', marginTop: -20 }])}>
              <View style={StyleSheet.flatten([styles.indactorSpacer, indicatorSpacerWidth])}></View>
            </View>
          </View>
        </View>
      )
    }
    else{
      let indicatorWidth = { flex: percentageComplete }
      let indicatorSpacerWidth = { flex: 100 - percentageComplete }

      // let indicatorWidth = { flex: 70 }
      // let indicatorSpacerWidth = { flex: 30 }
      return (
        <View style={{ padding: 10}}>
          <View style={styles.leftRight}>
            <Text style={styles.labelText}>{this.props.leftLabel}</Text>
            <Text style={styles.labelText}>{this.props.rightLabel}</Text>
          </View>
          <View ref={`someView`}>
            <View style={StyleSheet.flatten([styles.bar, styles.darkBar])}></View>
            <View style={StyleSheet.flatten([styles.bar, {flexDirection: 'row', marginTop: -20 }])}>
              <View style={StyleSheet.flatten([styles.indicatorBar, indicatorWidth])}></View>
              <View style={StyleSheet.flatten([styles.indactorSpacer, indicatorSpacerWidth])}></View>
            </View>
          </View>
        </View>

      )
    }
  }
}

export class BudgetStatusBarDates extends React.Component {


  render() {
    let leftLabel
    let rightLabel
    let budgetPercentage
    if (this.props.budget) {
      let budgetHelper = new BudgetHelper(this.props.budget)
      let { nextResetDate, previousResetDate, budgetAmount, budgetUsed } = budgetHelper.all()
      budgetPercentage = budgetHelper.budgetPercentage()
      //console.log('BUDGET PERCENTAGE: ', budgetPercentage )
      leftLabel = previousResetDate.format('M/D')
      rightLabel = nextResetDate.format('M/D')
    } else {
      leftLabel = '...'
      rightLabel = '...'
      budgetPercentage = 0
    }
    return (
      <BudgetStatusBar
        percentageComplete={budgetPercentage}
        leftLabel={leftLabel}
        rightLabel={rightLabel}
      />
    )
  }
}

export class BudgetStatusBarCategory extends React.Component {

  render() {
    let categoryHelper = new CategoryHelper(this.props.category)
    return (
      <BudgetStatusBar
        style={{padding: 10}}
        percentageComplete={categoryHelper.categoryBudgetPercentage()}
        leftLabel={this.props.category.name}
        rightLabel={`${categoryHelper.categoryBudgetUsed()}/${categoryHelper.categoryBudgetAmount()}`}
      />
    )
  }
}

const styles = StyleSheet.create({
  labelText: {
    color: config.midDark,
    fontWeight: '600',
    fontSize: 10,
  },
  leftRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  bar: {
    height: 20,
    borderRadius: 3,
  },
  darkBar: {
    backgroundColor: '#D8D8D8',
  },
  indicatorBar: {

    width: 100,
    backgroundColor: '#06AEC1'

  }
});
