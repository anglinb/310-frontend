import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Image,
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import ControlBanner from './components/ControlBanner'

export default class NewCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      budgetAmount: '',
      budget: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.budget,
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //this is a placeholder until we get Hamburger running
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    console.log('navigate to transaction')
    this.props.navigation.navigate('NewTransaction')
  }

  //EDITINGBANNER buttons
  async xButtonPress() {
    await this.props.navigation.state.params.updateBudget()
    //navigate back a page
    this.props.navigation.goBack()
  }
  async yButtonPress() {
    let { resp, error } = await API.build().authenticated().post({
        //how do you get the Budget ID?
        endpoint: `/budgets/${this.state.budget._id}/categories`,
        body: {
          name: this.state.name,
          amount: this.state.budgetAmount,
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
          header = {'New Category'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <View style={{padding: 10}}>
          <StyledTextInput
            labelText={'Category Name'}
            value={this.state.name}
            accessible={true}
            accessibilityLabel={'category-name'} 
            onChangeText={(name) => this.setState({name})} />

            <StyledTextInput
              labelText={`Budget Amount`}
              value={this.state.budgetAmount}
              accessible={true}
              accessibilityLabel={'budget-amount'} 
              onChangeText={(budgetAmount) => this.setState({budgetAmount})} />
        </View>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
});
