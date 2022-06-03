import * as React from 'react';
import { Template } from './template';
import { createMaterialBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, Pressable, View } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const DisabledTabBarButton = ({ style, ...props }) => (
  <Pressable disabled style={[{ opacity: 0.2 }, style]} {...props} />
)

export const Tabs = props => {
  const badgeFoods = useSelector((state) => state.badge.foods);
  const badgePlus = useSelector((state) => state.badge.add);
  const badgeRemove = useSelector((state) => state.badge.remove);

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
          name="Foods"
          options={{
            tabBarLabel: 'Foods',
            tabBarBadge:badgeFoods,
            tabBarButton: DisabledTabBarButton,
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
            tabBarBadge:badgePlus,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="basket-plus-outline" color={color} size={24} />
            ),
          }}
        >{props=><Template screen="Plus" />}</Tab.Screen>
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