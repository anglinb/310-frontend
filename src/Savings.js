import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';

import Container from './components/Container'
import Store from './lib/Store'
import API from './lib/API'
import config from './config'


export default class Savings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      budget: props.navigation.state.params.budget || null,
      budgetArchives: [],
    }
    this.updateArchives = this.updateArchives.bind(this)
  }

  async updateArchives()  {
    let endpoint = `/budgets/${this.budget._id}/archives`
    let { resp, error } = await API.build().authenticated().get({
      endpoint
    })
    if ( error )  {
      Alert.alert(
        'Error',
        error.message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {
      this.setState({
        budgetArchives: resp
      })
    }
  }


  componentDidMount() {
    this.updateArchives()
  }


  render() {
    return (
     <Container>
      <View>
        {this.budgetArchives.map((archive) => {
          return <Text>{`TODO RENDER HERE`}</Text>
        })}
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
