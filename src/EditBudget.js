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
  Item,
  ScrollView,
  FlatList,
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import ControlBanner from './components/ControlBanner'

export default class EditBudget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      budgetAmount: '',
      resetType: '',
      startDate: '',
      categories: ['Food', 'Rent'],
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
    console.log('navigate to transaction')
    this.props.navigation.navigate('NewTransaction')
  }

  //EDITINGBANNER buttons
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }
  async yButtonPress() {
    let { resp, error } = await API.build().post({
        //how do you get the Budget ID?
        endpoint: `/budgets/${this.props.budget._id}/categories`,
        body: {
          name: this.state.name,
          amount: this.state.budgetAmount,
          resetType: this.state.resetType,
          startDate: this.state.startDate,
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

  //other buttons
  async editCategoryButtonPress(){
    console.log('Edit Category')
    this.props.navigation.navigate('EditCategory')
  }
  async newCategoryButtonPress(){
    console.log('New Category')
    this.props.navigation.navigate('NewCategory')
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
        />
        <EditingBanner
          header = {'Edit Budget'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <View style={{padding: 10}}>
          <ScrollView>
            <StyledTextInput
              labelText={'Budget Name'}
              value={this.state.name}
              onChangeText={(name) => this.setState({name})} />
              <StyledTextInput
                labelText={`Budget Amount`}
                value={this.state.budgetAmount}
                onChangeText={(budgetAmount) => this.setState({budgetAmount})} />
              <StyledTextInput
                labelText={'Start Date'}
                value={this.state.startDate}
                onChangeText={(startD) => this.setState({startD})} />
              <View style={styles.container}>
                <FlatList
                  data={this.state.categories}
                  renderItem={(cat) =>  <StyledButton
                      style={{marginTop: 10}}
                      title={'Dynamically Insert'}
                      onPress={this.editCategoryButtonPress}
                      /> }
                />
                </View>
              <StyledButton
                  style={{marginTop: 10}}
                  title={`+ New Category`}
                  onPress={this.newCategoryButtonPress}
                  />
              <Text style={styles.headerText}>{`Reset Options:`}</Text>
              <View>
                <Picker
                  mode={'dropdown'}
                  selectedValue={this.state.resetType}
                  onValueChange={(resetT) => this.setState({resetType: resetT})}>
                  <Item label='Weekly' value='WEEK' />
                  <Item label='Monthly' value='MONTH' />
                  </Picker>
                </View>
            </ScrollView>
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
