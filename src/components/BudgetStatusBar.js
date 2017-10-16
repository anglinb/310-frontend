import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import config from '../config'


export default class BudgetStatusBar extends React.Component {

  render() {
    return (
      <View style={{ padding: 10 }}>
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
    backgroundColor: '#0805A3'
  }
});
