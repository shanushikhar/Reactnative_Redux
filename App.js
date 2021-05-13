//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import MealsNavigator from './navigation/MealsNavigator'
import mealsReducer from './store/reducers/meals'

//enableScreens() // it makes stack bar bigger

const rootReducer = combineReducers({
  meals: mealsReducer
})

const store = createStore(rootReducer)

const App = () => {
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>

  );
};

//make this component available to the app
export default App;
