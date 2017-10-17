import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import config from '../config'





export default class TransactionRow extends React.Component {

  render() {
    let currDate = new Date(this.props.transaction.timestamp)
    let dateString = currDate.getMonth() + "/" + currDate.getDate()
    return (

      <View style={{height:30, flexDirection:'row'}}>
        <Text style={{flex: 1}}> {dateString} </Text>
        <Text style={{flex: 3}}> {this.props.transaction.name} </Text>
        <Text style={{flex: 1}}> -${this.props.transaction.amount} </Text>


      </View>
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
