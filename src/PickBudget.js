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

export default class PickBudget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      budgets: ['TA Stipend','Work Study','Shits & Gigs'],
      selectedBudget: '',
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
  }

  async componentDidMount() {
    /*let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets'
    })

    const budgetsList = resp.map((obj) => {
      obj.key = obj.name
      return obj;
    })

    this.setState({'budgets':budgetsList})
    this.handleButtonPress = this.handleButtonPress.bind(this)*/
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //this is a placeholder until we get Hamburger running
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    //already at transaction so leave empty
    this.props.navigation.navigate('NewTransaction')
  }

  //EDITINGBANNER buttons
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }

  async yButtonPress() {
    //send over the budget selection to prop
    this.props.navigation.state.params.returnBudget(this.state.selectedBudget)
    this.props.navigation.goBack()
  }

  render() {
    let budgetItems = this.state.budgets.map( (s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        })

    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
        <EditingBanner
          header = {'Select Budget'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <ScrollView>
          <View style={{padding: 10}}>
          <Picker
              mode={'dropdown'}
              selectedValue={this.state.selectedBudget}
              onValueChange={(budg) => this.setState({selectedBudget: budg})}>
              {budgetItems}
              </Picker>
            </View>
          </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
