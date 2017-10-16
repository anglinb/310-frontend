import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  FlatList,
} from 'react-native';
import BudgetWidget from './components/BudgetWidget'


import StyledTextInput from './components/StyledTextInput'
import StyledButtonLight from './components/StyledButtonLight'
import Container from './components/Container'
import API from './lib/API'

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      budgets: [{'key': 'Budget 1'}, {'key':'Budget 2'}],
    }
  }



  render() {
    return (
      <Container avoidKeyboard={true} centerContent={true}>
        <View style={styles.container}>
          <FlatList
          data={this.state.budgets}
          renderItem={(budget) => <BudgetWidget budget={budget}/>}
        />
      </View>
        <StyledButtonLight
          style={{marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}}
          title={`+ Add a New Budget`}/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
