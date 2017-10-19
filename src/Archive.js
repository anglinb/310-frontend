import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';

import Container from './components/Container'
import Store from './lib/Store'
import config from './config'
import ArchiveChart from './components/ArchiveChart'


export default class Archive extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      budget: props.navigation.state.params.budget || null,
    }
  }


  render() {
    return (
     <Container style={styles.middle}>
     <View style={{padding:10}}/>
      <View>
      <ArchiveChart
        navigation={this.props.navigation}
        budget={this.state.budget}/>
      </View>
      </Container>
   )
  }
}

const styles = StyleSheet.create({
  middle: {
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  }
});
