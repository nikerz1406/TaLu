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
        {props=><Template screen="foods" />}
      </Tab.Screen>
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
        {props=><Template screen="qrcode" />}
      </Tab.Screen>
      <Tab.Screen
        name="Refrigerator"
        options={{
          tabBarLabel: 'Refrigerator',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="texture-box" color={color} size={24} />
          ),
        }}
      >{props=><Template screen="refrige" />}</Tab.Screen>
      <Tab.Screen
        name="Audio"
        options={{
          tabBarLabel: 'Audio',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="text-to-speech" color={color} size={24} />
          ),
        }}
      >{props=><Template screen="audio" />}</Tab.Screen>
    </Tab.Navigator>
  )
    
}