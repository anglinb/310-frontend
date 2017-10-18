import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';

import config from '../config'
import BudgetHelper from '../lib/BudgetHelper'

class BudgetBannerItem extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.bannerItemTop}>{this.props.topText}</Text>
        <Text style={styles.bannerItemBottom}>{this.props.bottomText}</Text>
      </View>
    )
  }
}

export default class BudgetBanner extends React.Component {

  render() {
    let budgetAmount
    let budgetUsed
    let transactionCount
    let nextResetDate
    let nextResetDateText
    if (this.props.budget) {
      let budgetHelper = new BudgetHelper(this.props.budget)

      // TODO: For some reason all won't work
      // ({ budgetAmount, budgetUsed, transactionCount, nextResetDate } = budgetHelper.all())
      budgetAmount = budgetHelper.budgetAmount()
      budgetUsed  = budgetHelper.budgetUsed()
      transactionCount = budgetHelper.transactionCount()
      nextResetDate = budgetHelper.nextResetDate()

      nextResetDateText = nextResetDate.format('M/D')
    } else {
      budgetAmount = 0
      budgetUsed = 0
      transactionCount = 0
      nextResetDateText = '...'
    }

    //making it show negative if over
    if(budgetUsed > budgetAmount){
      budgetUsed = budgetAmount - budgetUsed
    }

    return (
      <View>
        <View style={StyleSheet.flatten([styles.leftRight, {backgroundColor: config.lightGreen}])}>
          <BudgetBannerItem
            topText={`$${budgetUsed}/$${budgetAmount}`}
            bottomText={`Total Spent`}
            />
          <BudgetBannerItem
            topText={nextResetDateText}
            bottomText={`Next Reset Date`}
            />
        </View>
        <View style={StyleSheet.flatten([styles.leftRight, {backgroundColor: config.darkerGreen}])}>
          <Text style={styles.bannerBottomText}>{`${transactionCount} Transaction(s)`}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  leftRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  bannerItemTop: {
    fontSize: 16,
    fontFamily: config.font,
    fontWeight: '600',
    color: '#fff',
  },
  bannerItemBottom: {
    fontSize: 10,
    fontFamily: config.font,
    fontWeight: '600',
    color: '#fff',
  },
  bannerBottomText: {
    color: '#fff',
    fontFamily: config.font,
    fontWeight: '600',
  }
});
