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
    return (
      <View>
        <View style={StyleSheet.flatten([styles.leftRight, {backgroundColor: config.lightGreen}])}>
          <BudgetBannerItem
            topText={this.props.budgetRatio}
            bottomText={`Total Spent`} 
            />
          <BudgetBannerItem
            topText={this.props.resetDate}
            bottomText={`Next Reset Date`} 
            />
        </View>
        <View style={StyleSheet.flatten([styles.leftRight, {backgroundColor: config.darkerGreen}])}>
          <Text style={styles.bannerBottomText}>{`12 Transactions`}</Text>
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
    color: '#fff'
  }
});
