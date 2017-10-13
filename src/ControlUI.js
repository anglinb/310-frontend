//to be tested!!

import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Component,
  Button,
  Text,
  View,
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class ControlUI extends React.Component {

  constructor(props){
    super(props);

  }

  render() {
    return (
    <KeyboardAvoidingView style={styles.container}>
      <NavigationBar
        title={titleConfig}
        rightButton={rightButtonConfig}
      />
      </KeyboardAvoidingView>
    )
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    rightButtonConfig = {
      title: 'Next',
      handler: () => alert('hello!'),
      titleConfig = {
        title: '$anity',
    }
  });
