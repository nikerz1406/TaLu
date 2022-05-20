import React from 'react';
import { Tabs } from './layout/footer';
import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store  from './redux/store';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 255, 255)',
  },
};

export default function App() {
  return (
    <Provider store={store} >
      <NavigationContainer theme={MyTheme}>
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
}



