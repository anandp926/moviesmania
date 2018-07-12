import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import MoviesSearch from './component/MoviesSearch'
import MovieDetail from './component/MovieDetail'

const MainNavigation = createStackNavigator({
  Home: {
    screen: MoviesSearch,
    navigationOptions: {
      title:'omdbSearchClient'
    }
  },
  MovieDetail: {
    screen: MovieDetail,
    navigationOptions:{
      header:null
    }
  }
}, )

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigation/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#efeff6'
  },
});
