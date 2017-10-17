import React from 'react'
import {
  StyleSheet,
  TextInput,
  Text,
  View, Picker
} from 'react-native'
import config from '../config'

export default class StyledPicker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {current_name: {}}

    this.renderLabel = this.renderLabel.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
  }

  onValueChange(itemValue, itemIndex) {
    this.setState({current_name:itemValue})
    this.props.onValueChange(itemValue)


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

    const pickerItems = this.props.objects.map((obj) => {
      return (<Picker.Item label={obj.name} key={obj.name} value={JSON.stringify(obj)}/>);
    });
    return (
      <View style={textInputStyles.wrapper}>
        { this.renderLabel() }
        <Picker
          selectedValue={this.state.current_name}
          onValueChange={(itemValue, itemIndex) => this.onValueChange(itemValue, itemIndex)}>
          {pickerItems}
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
