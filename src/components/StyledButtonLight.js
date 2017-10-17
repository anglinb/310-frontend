import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { LinearGradient } from 'expo';

import config from '../config'

export default class StyledButton extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
        <View style={buttonStyles.addBudget}>
            <Text
              style={buttonStyles.text}>
              { this.props.title }
            </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const buttonStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: config.textGreen,
    backgroundColor: 'transparent',
    fontFamily: config.font
  },
  addBudget: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F0F4F3',
    /* Rectangle 10: */
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 2, height: 2},
  }
})
