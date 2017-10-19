import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import Container from '../components/Container'
import BudgetHelper from '../lib/BudgetHelper.js'
import API from '../lib/API'
import Store from '../lib/Store'
import config from '../config'
import CategoryHistory from '../CategoryHistory.js'

export default class ArchiveChart extends React.Component {

  constructor(props) {
    super(props)
    this.press = this.press.bind(this)
  }

  render() {
    let name
    let length
    let budget
    let categoryNames = new Array()
    if(this.props.budget) {
      name = this.props.budget.name
      length = this.props.budget.categories.length
      for(let i = 0; i < length; i++) {
        categoryNames.push(<View key={i} style={{flexDirection:'row', justifyContent: 'space-between', left:10}}>
            <TouchableHighlight onPress={() => this.press(this.props.budget.categories[i].slug)} ><Text style={styles.categoryText}>{this.props.budget.categories[i].name}</Text></TouchableHighlight>
        </View>)
      }
    }
    else {
      name = ''
    }

    return(
      <Container>
        <View>
          <Text style={styles.headerText}>{name}</Text>
          <Text style={styles.dirText}>{'Click on the desired budget to see the transactions from that category.'}</Text>
        </View>
        <ScrollView>{ categoryNames }</ScrollView>
      </Container>
    )

  }

  press(slug) {
    console.log('pressed ' + slug);
    this.props.navigation.navigate('CategoryHistory', { budget: this.props.budget, slug} );
  }

}

const styles = StyleSheet.create({
  headerText: {
    color: config.darkerGreen,
    fontSize: 25,
    fontWeight: '500',
    padding:0
  },
  dirText: {
    color: config.textGreen,
    fontSize: 14,
    fontWeight: '300',
    padding:0,
    marginTop: 10,
    marginBottom: 30,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: '400',
    padding:0,
    marginTop: 10,
    marginBottom: 10,
  },
  middle: {
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  }
});
