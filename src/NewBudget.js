import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Image,
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

export default class NewBudget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      resetType: 'WEEK',
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
    //navigate back a page
    this.props.navigation.goBack()
  }
  async yButtonPress() {
    let resetDate = new Date().getDate()
    let { resp, error } = await API.build().authenticated().post({

        endpoint: `/budgets/`,
        body: {
          "name": this.state.name,
          "resetType": this.state.resetType,
          "resetDate": resetDate,
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
        console.log("success")
        console.log(resp)

        this.props.navigation.navigate('Budget', {'budget':resp})
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
          header = {'New Budget'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <View style={{padding: 10}}>
          <StyledTextInput
            labelText={'Budget Name'}
            value={this.state.name}
            onChangeText={(name) => this.setState({name})} />
            <Text style={styles.headerText}>{`Reset Options:`}</Text>
            <Picker
              selectedValue={this.state.resetType.toString()}
              onValueChange={(resetT) => this.setState({resetType: resetT.toString()})}>
              <Picker.Item label='Weekly' value='WEEK' />
              <Picker.Item label='Monthly' value='MONTH' />
              </Picker>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: config.veryDarkText,
    fontSize: 20,
    marginTop: 30,
    fontWeight: '600',
  }
});
