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

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
    }

  }

  async componentDidMount() {
    let authStore = Store.authenticationStore()
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWU0MzVhNmQ5ODQ3MTgxMjJlZjYxMDciLCJpYXQiOjE1MDgxMjg5NTN9.9k8sgkPXgN14FJVt8QJuGY_wEZZHjOnoe0sKoT3AhBo'
    await authStore.setAuthenticationToken(token)
    let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets/'
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
    //TODO: Bring up create budget screen
  }




  render() {
    return (
      <Container avoidKeyboard={true} centerContent={true}>
        <View style={styles.container}>
          <FlatList
          data={this.state.budgets}

          renderItem={(budget) =>  <BudgetWidget navigation={this.props.navigation} budget={budget}/> }
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
