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
      budget: props.navigation.state.params.budget || null,
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
    this.newCategoryButtonPress = this.newCategoryButtonPress.bind(this)
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
    let { resp, error } = await API.build().authenticated().post({
        //how do you get the Budget ID?
        endpoint: `/budgets/${this.state.budget._id}/categories`,
        body: this.state.budget
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
  /**

              <StyledTextInput
                labelText={`Budget Amount`}
                value={this.state.budget.budgetAmount}
                onChangeText={(budgetAmount) => this.setState({budgetAmount})} />
  */

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
              value={this.state.budget.name}
              onChangeText={(name) => {
                this.setState({ budget: Object.assign({}, this.state.budget, { name })})
              }} />
              <StyledTextInput
                labelText={'Start Date'}
                value={String(this.state.budget.resetDate)}
                onChangeText={(resetDate) => {
                    this.setState({
                      budget: Object.assign({}, this.state.budget, { resetDate: parseInt(resetDate, 10) })
                    })
                  }}/>
              <View style={styles.container}>
                <FlatList
                  data={this.state.budget.categories}
                  renderItem={(cat) =>  <StyledButton
                      style={{marginTop: 10}}
                      title={cat.name}
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
                  selectedValue={this.state.budget.resetType}
                  onValueChange={(resetType) => {
                    this.setState({ budget: Object.assign({}, this.state.budget, { resetType })})
                  }}>
                  <Picker.Item label='Weekly' value='WEEK' />
                  <Picker.Item label='Monthly' value='MONTH' />
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
