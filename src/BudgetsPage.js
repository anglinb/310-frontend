import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import BudgetWidget from './components/BudgetWidget'

import Store from './lib/Store'

import StyledTextInput from './components/StyledTextInput'
import StyledButtonLight from './components/StyledButtonLight'
import Container from './components/Container'
import API from './lib/API'
import ControlBanner from './components/ControlBanner'

export default class BudgetsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
    }
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.updateBudget = this.updateBudget.bind(this)
  }


  static navigationOptions = {
    headerLeft: null
  }

  async componentDidMount() {
    let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets'
    })

    if (error) {
      console.log('EEREROE$OIRJOFIJOFJELWIJFOIEWJOIFHWEOIH', error)
    }
      console.log('GOT BUDGETS', resp.map((budget) => { return budget._id }))

    const budgetsList = resp.map((obj) => {
      obj.key = obj.name
      return obj;
    })
    this.synchronize()
    this.setState({'budgets':budgetsList})
  }

  handleButtonPress() {
    console.log("handled button press")
    this.props.navigation.navigate('NewBudget', {updateBudget: this.updateBudget})
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //this is a placeholder until we get Hamburger running
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    console.log('navigate to transaction')
    this.props.navigation.navigate('NewTransaction', {updateBudget: this.updateBudget })
  }

  async updateBudget() {
    console.log("GELWTJL")
    const endpoint = "/budgets"
    let { resp, error } = await API.build().authenticated().get({
      endpoint: endpoint
    })
    if (error) {
      Alert.alert(
        'Error',
        error.message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {
      console.log('GOT BUDGETS', resp)
      this.setState({ budgets: resp }, () => {
        this.forceUpdate()
      })
    }
  }

  async respondToInvite(invite, accept) {
    const endpoint = `/budgets/${invite.budget_id}/invites/respond` 
    const body = { accept }
    let { resp, error } = await API.build().authenticated().post({
      endpoint,
      body,
    })
    if (error) {
      Alert.alert(
        'Error',
        error.message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {
      this.updateBudget()
    }
  }

  async alertAndRespondInvite(invite) {
    Alert.alert(
      'Received New Invite',
      `Would you like to accept an invite to join '${invite.budget_name}' from user '${invite.inviter_username}'?`,
      [
        {text: 'Yes', onPress: () => this.respondToInvite(invite, true)},
        {text: 'No', onPress: () => this.respondToInvite(invite, false)},
      ],
      { cancelable: false }
    )
  }

  async synchronize() {
    const endpoint = "/sync"
    let { resp, error } = await API.build().authenticated().get({
      endpoint: endpoint
    })
    if (!error) {
      console.log('SYNCHRONIZE RESPONSE', resp)
      // Could add more here in the future
      if (resp.invites && resp.invites.length > 0)  {
        await resp.invites.forEach(async (invite) => {
          return this.alertAndRespondInvite(invite)
        })
      }
    }
  }

  render() {
    return (
      <Container avoidKeyboard={true} centerContent={true} padding={0}>
        <ControlBanner
          style ={{flex: 1}}
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
        <View style={styles.container}>
          <FlatList
          data={this.state.budgets}
          renderItem={(budget) =>  <BudgetWidget navigation={this.props.navigation} budget={budget.item}/> }
          />
          </View>
        <StyledButtonLight
          onPress={()=> {this.handleButtonPress()}}
          style={{marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20, flex: 0.5}}
          title={`+ Add a New Budget`}/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4
  }
});
