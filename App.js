import React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';

import store from './src/store/store';

import RootContainer from './src/navigation/ShopNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
};

export default App;
