import React from 'react';
import {
  Alert,
  Container,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';

import config from '../config'

export default class EditingBanner extends React.Component {

  //need to change the Y button to a check image
  render() {
    return (
      <View>
        <View style={StyleSheet.flatten([styles.leftRight, {backgroundColor: config.lightGreen}])}>
          <Button title={`X`} onPress={this.props.xButtonPress}/>
          <Text style={styles.headerText}>{ this.props.header }</Text>
          <Button title={`Y`} onPress={this.props.yButtonPress}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: config.white,
    fontSize: 18,
    fontWeight: '600',
  },
  leftRight: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner: {
    fontFamily: config.font,
    fontWeight: '600',
    color: '#fff',
  },
});
