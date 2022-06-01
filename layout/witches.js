import * as React from 'react';
import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { Tabs } from './tabs';
import { Stacks } from './stacks';
import { useSelector } from 'react-redux';

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 255, 255)',
    },
  };

export const Witches = props => {
    const qr = useSelector((state) => state.qr);
    return(
        <NavigationContainer theme={MyTheme}>
            {qr.registed ? <Tabs/> : <Stacks/>} 
        </NavigationContainer>
    )
}