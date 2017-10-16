import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import config from '../config'
import BudgetHelper from '../lib/BudgetHelper'


export default class BudgetStatusBar extends React.Component {

  render() {
    return (
      <View style={{ padding: 10}}>
        <View style={styles.leftRight}>
          <Text style={styles.labelText}>{this.props.leftLabel}</Text>
          <Text style={styles.labelText}>{this.props.rightLabel}</Text>
        </View>
        <View>
          <View style={StyleSheet.flatten([styles.bar, styles.darkBar])}></View>
          <View style={StyleSheet.flatten([styles.bar, styles.indicatorBar])}></View>
        </View>
      </View>
    )
  }
}

export class BudgetStatusBarDates extends React.Component {
  render() {
    let leftLabel
    let rightLabel
    if (this.props.budget) {
      let budgetHelper = new BudgetHelper(this.props.budget)
      let { nextResetDate, previousResetDate, budgetAmount, budgetUsed } = budgetHelper.all()
      leftLabel = previousResetDate.format('M/D')
      rightLabel = nextResetDate.format('M/D')
    } else {
      leftLabel = '...'
      rightLabel = '...'
    }
    return (
      <BudgetStatusBar
        leftLabel={leftLabel}
        rightLabel={rightLabel}
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
    marginTop: -20,
    width: 100,
    backgroundColor: '#06AEC1'

  }
});
