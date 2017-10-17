import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Picker,
  ScrollView
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import StyledPicker from './components/StyledPicker'
import ControlBanner from './components/ControlBanner'
import TransactionEntry from './components/TransactionEntry'

export default class NewTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      budget: '',
      category: '',
      amount: '',
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
    this.categoryButtonPress = this.categoryButtonPress.bind(this)
    this.budgetButtonPress = this.budgetButtonPress.bind(this)
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
    //already at transaction so leave empty
    //this.props.navigation.navigate('NewTransaction')
  }

  //EDITINGBANNER buttons
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }

  async yButtonPress() {
    let { resp, error } = await API.build().post({
        //TODO: POST handle and proper body verification
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
        //TODO: logic for category notificaitons
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
            header = {'New Transaction'}
            xButtonPress={() => {this.xButtonPress()}}
            yButtonPress={() => {this.yButtonPress()}}
            />
          <ScrollView>
            <View style={{padding: 10}}>
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
            </View>
          </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
