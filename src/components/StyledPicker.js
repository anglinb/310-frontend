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
    this.state = {
      language: 'Java',
    }
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
        <Picker
          style={{height:30, width:100}}
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    )
  }
}

const textInputStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'stretch',
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
  }
})
