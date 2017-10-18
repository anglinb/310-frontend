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
import TransactionEntry from './components/TransactionEntry'
import StyledPicker from './components/StyledPicker'

export default class EditTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      transaction: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.transaction,
      budget: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.budget,
      category: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.category,
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
    this.deleteButtonPress = this.deleteButtonPress.bind(this)
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

    let { resp, error } = await API.build().authenticated().put({
        endpoint: `/budgets/${this.state.budget._id}/categories/${this.state.category.slug}/transactions/${this.state.transaction._id}`,
        body: this.state.transaction
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
        await this.props.navigation.state.params.updateBudget()
        this.props.navigation.goBack()
      }
  }

  async deleteButtonPress() {
    let { resp, error } = await API.build().authenticated().delete({
        //get handle
        endpoint: `/budgets/${this.state.budget._id}/categories/${this.state.category.slug}/transactions/${this.state.transaction._id}`,
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
        cosole.log()
        await this.props.navigation.state.params.updateBudget()
        //navigate back a page
        this.props.navigation.goBack()
      }
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
          <ScrollView>
            <View style={{padding: 10}}>
              <StyledTextInput
                labelText={'Transaction Name'}
                value={this.state.transaction.name}
                onChangeText={(name) => {
                  this.setState({ transaction: Object.assign({}, this.state.transaction, { name })})
                }} />
              <StyledTextInput
                  labelText={`Description`}
                  value={this.state.transaction.description}
                  onChangeText={(description) => {
                    this.setState({ transaction: Object.assign({}, this.state.transaction, { description })})
                  }} />
              <StyledTextInput
                  labelText={`Amount`}
                  value={String(this.state.transaction.amount)}
                  onChangeText={(amount) => {
                      this.setState({
                        transaction: Object.assign({}, this.state.transaction, { amount: parseInt(amount, 10) })})
                      }} />
              <StyledButton
                  style={{marginTop: 10}}
                  title={`Delete Transaction`}
                  onPress={this.deleteButtonPress}
                  />
          </View>
          </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

});
