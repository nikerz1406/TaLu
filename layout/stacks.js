import * as React from 'react';
import { Template } from './template';
import { createMaterialBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export const Stacks = props => {

  return (
      <Tab.Navigator
        initialRouteName="Foods"
        barStyle={{ backgroundColor: '#c8bfe7',color:"white" }}
        activeColor="#424242"
        inactiveColor="#EFEBE9"
        labelStyle={{ fontSize: 12 }}
        style={{ backgroundColor: '#fff' }}
        overlayColor="transparent"
      >
        <Tab.Screen
          name="Qr"
          
          options={{
            tabBarLabel: 'Scan',
            tabBarVisible:"true",
            tabBarBadge:null,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="line-scan" color={color} size={24} />
            ),
          }}
        >
          {props=><Template screen="Qrcode" />}
        </Tab.Screen>
        <Tab.Screen
          name="Refrigerator"
          
          options={{
            tabBarLabel: 'Refrigerator',
            tabBarBadge:null,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="texture-box" color={color} size={24} />
            ),
          }}
        >{props=><Template screen="Refrigerator" />}</Tab.Screen>
      
      </Tab.Navigator>
  )
    
}