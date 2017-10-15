import React from 'react'
import { 
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native'
import config from '../config'

export default class StyledTextInput extends React.Component {

  constructor(props) {
    super(props)

    this.renderLabel = this.renderLabel.bind(this)
  }

  renderLabel() {
    if (this.props.labelText) {
      return (
        <Text style={textInputStyles.label}>{this.props.labelText}</Text>
      )
    }
    return null
  }

  render() {
    return (
      <View style={textInputStyles.wrapper}>
        { this.renderLabel() } 
        <TextInput style={StyleSheet.flatten([textInputStyles.textInput, this.props.style])} {...this.props} ></TextInput>
      </View>
    )
  }
}

const textInputStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'stretch',
    borderColor: 'blue',
    borderWidth: 2,
    paddingTop: 10,
  },
  label: {
    color: config.darkText,
    fontFamily: config.font,
    fontWeight: 'bold',
    fontSize: 18,
  },
  textInput: {
    borderRadius: 8,
    height: 36,

    color: config.darkText,
    fontFamily: config.font,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 8, 
    backgroundColor: config.darkBackground,
    borderColor: 'red',
    borderWidth: 2,
  } 
})