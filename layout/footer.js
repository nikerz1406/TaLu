import * as React from 'react';
import { Template } from './template';
import { createMaterialBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export const Tabs = props => {
  
  return (
    <Tab.Navigator
      initialRouteName="Lists"
      activeColor="#1565C0"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: '#fff' }}
      overlayColor="transparent"
    >
      <Tab.Screen
        name="Foods"
        options={{
          tabBarLabel: 'Foods',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={24} />
          ),
        }}
      >
        {props=><Template screen="Foods" />}
      </Tab.Screen>
      <Tab.Screen
        name="Plus"
        options={{
          tabBarLabel: 'Plus',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="basket-plus-outline" color={color} size={24} />
          ),
        }}
      >{props=><Template screen="Plus" />}</Tab.Screen>
      <Tab.Screen
        name="Recycle"
        options={{
          tabBarLabel: 'Recycle',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="beaker-remove-outline" color={color} size={20} />
          ),
        }}
      >{props=><Template screen="Recycle" />}</Tab.Screen>
      <Tab.Screen
        name="Qr"
        options={{
          tabBarLabel: 'Qr',
          tabBarVisible:"true",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={24} />
          ),
        }}
      >
        {props=><Template screen="Qrcode" />}
      </Tab.Screen>
      <Tab.Screen
        name="Refrigerator"
        options={{
          tabBarLabel: 'Refrigerator',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="texture-box" color={color} size={24} />
          ),
        }}
      >{props=><Template screen="Refrigerator" />}</Tab.Screen>
    
    </Tab.Navigator>
  )
    
}