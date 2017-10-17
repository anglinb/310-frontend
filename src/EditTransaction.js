import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  ScrollView,
  Picker,
  Item
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import ControlBanner from './components/ControlBanner'

export default class EditTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      budget: '',
      category: '',
      amount: '',
      language: 'java',
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.categoryButtonPress = this.categoryButtonPress.bind(this)
    this.budgetButtonPress = this.budgetButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
  }

  //Select buttons
  async budgetButtonPress(){
    //this is a placeholder until we get Hamburger running
    console.log('pickBudget')
    this.props.navigation.navigate('PickBudget', {returnBudget: this.returnBudget.bind(this)})
  }
  async categoryButtonPress(){
    this.props.navigation.navigate('PickCategory', {returnCategory: this.returnCategory.bind(this)})
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //this is a placeholder until we get Hamburger running
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    this.props.navigation.navigate('NewTransaction')
  }

  //BUTTON CONTROLS
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }

  async yButtonPress() {
    let { resp, error } = await API.build().put({
        //TODO: PUT handle and proper body verification
        endpoint: '',
        body: {
          name: this.state.name,
          budget: this.state.budget,
          category: this.state.category,
          amount: this.state.amount,
        }
      })
      if (error) {
        Alert.alert(
          'Whoops!',
          error.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      } else {
        this.props.navigation.navigate('Budget', {name: 'Lucy'})
      }
  }

  async deleteButtonPress() {
    let { resp, error } = await API.build().post({
        //get handle
        endpoint: '',
        body: {
          name: this.state.name,
          budget: this.state.budget,
          category: this.state.category,
          amount: this.state.amount,
        }
      })
      if (error) {
        Alert.alert(
          'Whoops!',
          error.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      } else {
        this.props.navigation.navigate('Budget', {name: 'Lucy'})
      }
  }

  //Helper classes to receive selected Category/Budget
  async returnBudget(budg) {
    this.setState({budget: budg});
    console.log(this.state.budget)
  }
  async returnCategory(cat) {
    this.setState({category: cat});
    console.log(this.state.category)
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
            />
        <EditingBanner
          header = {'Edit Transaction'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <View style={{padding: 10}}>
          <ScrollView>
            <StyledTextInput
              labelText={'Transaction Name'}
              value={this.state.name}
              onChangeText={(name) => this.setState({name})} />
            <StyledTextInput
                labelText={`Amount`}
                value={this.state.amount}
                onChangeText={(amount) => this.setState({amount})} />
            <StyledButton
                style={{marginTop: 10}}
                title={`Select Budget`}
                onPress={this.budgetButtonPress}
                />
            <StyledButton
                style={{marginTop: 10}}
                title={`Select Category`}
                onPress={this.categoryButtonPress}
                />
            <StyledButton
                style={{marginTop: 10}}
                title={`Delete Transaction`}
                onPress={this.deleteButtonPress}
                />
          </ScrollView>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

});
