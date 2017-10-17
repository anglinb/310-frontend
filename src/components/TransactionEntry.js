import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Picker
} from 'react-native';


import config from '../config'
import StyledTextInput from './StyledTextInput'
import StyledButton from './StyledButton'
import StyledPicker from './StyledPicker'

export default class NewTransaction extends React.Component {

  constructor(props) {
    super(props);

    this.handleChangeText = this.handleChangeText.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
  }
  handleChangeText(value, key) {

    this.props.makeTransaction(key, value)
  }

  onValueChange(value) {
    this.props.makeTransaction("category",JSON.parse(value))
  }

  render() {
    let selectOneObject = {"name": "Select One", "identifier":"dummy"}
    let curr_objs = this.props.budget.categories
    if(!(curr_objs[0].identifier ==="dummy")) {
      curr_objs.unshift(selectOneObject)
    }
    return (
        <View style={{padding: 10}}>
          <StyledTextInput
            labelText={'Transaction Name'}
            onChangeText={(name) => this.handleChangeText(name, "name")} />
          <StyledTextInput
              labelText={`Description`}
              onChangeText={(description) => this.handleChangeText(description, "description")} />
          <StyledPicker
              labelText={`Category`}
              objects={curr_objs}
              onValueChange={this.onValueChange}
               />
          <StyledTextInput
              labelText={`Amount`}
              onChangeText={(amount) => this.handleChangeText(amount, "amount")} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: config.veryDarkText,
    fontSize: 20,
    fontWeight: '600',
  }
});
