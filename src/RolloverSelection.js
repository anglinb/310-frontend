import React from 'react';
import {
  Alert,
  CheckBox,
  StyleSheet,
  FlatList,
  Button,
  Text,
  View,
  Image,
} from 'react-native';

import API from './lib/API'
import StyledButton from './components/StyledButton'
import EditingBanner from './components/EditingBanner'

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    console.log('MyListItemfkd slfjsdl', this.props)
    return (
      <View style={styles.listElement}>
        <Text>{`${this.props.category.name} has $${this.props.category.rollover} to rollover.`}</Text>
        <Button onPress={this._onPress} title={this.props.selected ? 'Apply' : 'Ignore' } />
      </View>
    )
  }
}

export default class RolloverSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      budget: props.navigation.state.params.budget,
      selected: (new Map(): Map<string, boolean>)
    }
    this._allApply = this._allApply.bind(this)
    this._allIgnore = this._allIgnore.bind(this)
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
  }


  _keyExtractor = (item, index) => item.slug;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    console.log("FJDSLKFJKDl", id)
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(this.state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _allApply() {
    this.setState((state) => {
      const selected = new Map(state.selected);
      this.props.data.forEach((category) => {
        selected.set(category.slug, true)
      })
      return {selected};
    });
  }

  _allIgnore() {
    console.log()
    this.setState((state) => {
      const selected = new Map(state.selected);
      this.props.data.forEach((category) => {
        selected.set(category.slug, false)
      })
      return {selected};
    });
  }

  async xButtonPress() {
    this.props.navigation.goBack()
  }

  async yButtonPress() {
    console.log('LFJDLKSLKDJLJK HERERERERERERE')
    const updates = this.state.budget.categories.filter((category) => {
      return category.rolloverStatus && category.rollover !== 0
    }).map((category) => {
      return {
        categorySlug: category.slug,
        rolloverStatus: this.state.selected.get(category.slug) ? 'ACTIVE' : 'INACTIVE',
      }
    })
    console.log('UPDATES', updates)
    let { resp, error } = await API.build().authenticated().post({
        endpoint: `/budgets/${this.state.budget._id}/rollover/_batch`,
        body: {
          data: updates
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
        await this.props.navigation.state.params.updateBudget()
        //navigate back a page
        this.props.navigation.goBack()
      }
  }

  _renderItem = ({item}) => (
    <MyListItem
      id={item.slug}
      category={item}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.slug)}
      title={item.title}
    />
  );

  render() {
    const categories = this.state.budget.categories.filter((category) => {
      return category.rolloverStatus && category.rollover !== 0
    })
   return (
      <View>
      <EditingBanner
        header = {'Ignore or Apply Rollover'}
        xButtonPress={() => {this.xButtonPress()}}
        yButtonPress={() => {this.yButtonPress()}}
        />
        <View style={styles.leftRight}>
          <StyledButton
            style={{marginTop: 5, width: 148}}
            title={`Apply All`}
            onPress={this._allApply}
            />
          <StyledButton
            style={{marginTop: 5, width: 148}}
            title={`Ignore All`}
            onPress={this._allIgnore}
            />
        </View>
        <FlatList
          data={categories}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listElement: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftRight: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});