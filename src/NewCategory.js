import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'

export default class NewCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      budgetAmount: '',
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
  }

  async xButtonPress() {
    //navigate back a page
    this.props.navigation.navigate('Budget', {name: 'Lucy'})
  }
  async yButtonPress() {
    let { resp, error } = await API.build().post({
        //how do you get the Budget ID?
        endpoint: '/budgets/{budgetID}/categories',
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
        this.props.navigation.navigate('Budget', {name: 'Lucy'})
      }
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <EditingBanner
          header = {'New Category'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <View style={{padding: 10}}>
          <StyledTextInput
            labelText={'Category Name'}
            value={this.state.name}
            onChangeText={(name) => this.setState({name})} />
            <StyledTextInput
              labelText={`Budget Amount`}
              value={this.state.budgetAmount}
              onChangeText={(budgetAmount) => this.setState({budgetAmount})} />
              <StyledButton
              style={{marginTop: 20}}
              title={`Save Category`}
              onPress={this.xButtonPress}
            />
        </View>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
});
