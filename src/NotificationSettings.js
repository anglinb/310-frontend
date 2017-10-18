import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Switch
} from 'react-native';

import Container from './components/Container'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import EditingBanner from './components/EditingBanner'
import ControlBanner from './components/ControlBanner'

export default class NotificationSettings extends React.Component {

  //default thresholds are 50,90,100
  //default notification freq is Weekly
  constructor(props) {
    super(props);
    this.state = {
      fifty: true,
      sixty: false,
      seventy: false,
      eighty: false,
      ninety: true,
      hundred: true,
      daily: false,
      weekly: true,
      monthly: false,
      thresholds: [],
      frequency: '',
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
    this.props.navigation.navigate('NewTransaction')
  }

  //CONTROL BUTTONS
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }

  async yButtonPress() {
    if(this.state.fifty == true) this.state.thresholds.push(50)
    if(this.state.sixty == true) this.state.thresholds.push(60)
    if(this.state.seventy == true) this.state.thresholds.push(70)
    if(this.state.eighty == true) this.state.thresholds.push(80)
    if(this.state.ninety == true) this.state.thresholds.push(90)
    if(this.state.hundred == true) this.state.thresholds.push(100)

    if(this.state.daily == true) this.state.frequency='DAILY'
    else if(this.state.weekly == true) this.state.frequency='WEEKLY'
    else this.state.frequency='MONTHLY'

    let { resp, error } = await API.build().authenticated().post({
        endpoint: `/self/notifications`,
        body: {
          thresholds: this.state.thresholds
          frequency: this.state.frequency
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
        //navigate back a page
        this.props.navigation.goBack()
      }
  }

  async getValues() {
    let { resp, error } = await API.build().authenticated().get({
        endpoint: `/self/notifications`,
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
        console.log(resp)

        this.props.navigation.navigate('Budget', {'budget':resp})
      }
  }

  render() {
    //getValues()

    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
            />
        <EditingBanner
          header = {'Notification Settings'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <View style={{padding: 10}}>
          <Text style={styles.headerText}>{`Notification Threshold`}</Text>
          <View style={styles.leftRight}>
            <View style={styles.leftRight}>
              <Text style={styles.headerText}>{`50%`}</Text>
              <Switch
                onValueChange={(value) => this.setState({fifty: value})}
                value={this.state.fifty}
                onTintColor={config.lightGreen}/>
            </View>
            <Text style={styles.headerText}>{`80%`}</Text>
            <Switch
              onValueChange={(value) => this.setState({eighty: value})}
              value={this.state.eighty}
              onTintColor={config.lightGreen}/>
          </View>
          <View style={styles.leftRight}>
            <View style={styles.leftRight}>
              <Text style={styles.headerText}>{`60%`}</Text>
              <Switch
                onValueChange={(value) => this.setState({sixty: value})}
                value={this.state.sixty}
                onTintColor={config.lightGreen}/>
            </View>
            <Text style={styles.headerText}>{`90%`}</Text>
            <Switch
              onValueChange={(value) => this.setState({ninety: value})}
              value={this.state.ninety}
              onTintColor={config.lightGreen}/>
          </View>
          <View style={styles.leftRight}>
            <View style={styles.leftRight}>
              <Text style={styles.headerText}>{`70%`}</Text>
              <Switch
                onValueChange={(value) => this.setState({seventy: value})}
                value={this.state.seventy}
                onTintColor={config.lightGreen}/>
            </View>
            <Text style={styles.headerText}>{`100%`}</Text>
            <Switch
              onValueChange={(value) => this.setState({hundred: value})}
              value={this.state.hundred}
              onTintColor={config.lightGreen}/>
          </View>
          <Text style={styles.headerText}>{`Notification Frequency`}</Text>
            <View style={styles.leftRight}>
              <Text style={styles.headerText}>{`Daily`}</Text>
              <Switch
                onValueChange={(value) => this.setState({daily: value, weekly: false, monthly: false})}
                value={this.state.daily}
                onTintColor={config.lightGreen}/>
              </View>
            <View style={styles.leftRight}>
              <Text style={styles.headerText}>{`Weekly`}</Text>
              <Switch
                onValueChange={(value) => this.setState({weekly: value, daily: false, monthly: false})}
                value={this.state.weekly}
                onTintColor={config.lightGreen}/>
              </View>
            <View style={styles.leftRight}>
              <Text style={styles.headerText}>{`Monthly`}</Text>
              <Switch
                onValueChange={(value) => this.setState({monthly: value, daily: false, weekly: false})}
                value={this.state.monthly}
                onTintColor={config.lightGreen}/>
              </View>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: config.veryDarkText,
    fontSize: 20,
    fontWeight: '600',
  },
  leftRight: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
