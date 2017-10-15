import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

import { LinearGradient } from 'expo';

import config from '../config'

export default class StyledButton extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View>
          <LinearGradient
            colors={config.greenGradient}
            style={buttonStyles.gradient}>
            <Text
              style={buttonStyles.text}>
              { this.props.title }
            </Text>
          </LinearGradient>
        </View>
      </TouchableHighlight>
    )
  }
}

const buttonStyles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
    fontFamily: config.font 
  },
  gradient: {
    padding: 15,
    alignItems: 'center', 
    borderRadius: 5
  }
})