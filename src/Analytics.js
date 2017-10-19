import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Image
} from 'react-native';

import Container from './components/Container'
import Store from './lib/Store'
import config from './config'
import AnalyticsChart from './components/AnalyticsChart'


export default class Analytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      budget: props.navigation.state.params.budget || null,
    }
  }

  render() {
    return (
     <Container style={styles.middle}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <AnalyticsChart
          budget={this.state.budget}/>
      </View>
      </Container>
   )
  }
}

const styles = StyleSheet.create({
  leftRight: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  middle: {
    padding: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
