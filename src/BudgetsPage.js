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

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
    }
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
  }


  static navigationOptions = {
    headerLeft: null
  }

  async componentDidMount() {
    let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets'
    })

    const budgetsList = resp.map((obj) => {
      obj.key = obj.name
      return obj;
    })

    this.setState({'budgets':budgetsList})
    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  async handleButtonPress() {
    console.log("button clicked")
    this.props.navigation.navigate('NewBudget')
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

  render() {
    return (
      <Container avoidKeyboard={true} centerContent={true} padding={0}>
        <ControlBanner
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
          onPress={this.handleButtonPress}
          style={{marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}}
          title={`+ Add a New Budget`}/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
