import * as React from 'react';
import { Template } from './template';
import { createMaterialBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

export const Tabs = props => {
  const badgeFoods = useSelector((state) => state.badge.foods);
  const badgeRemove = useSelector((state) => state.badge.remove);
  const badgeAdd = useSelector((state) => state.badge.add);
  const badgeQr = useSelector((state) => state.badge.qr);
  const badgeRefrigerator = useSelector((state) => state.badge.refrigerator);
  return (
      <Tab.Navigator
        initialRouteName="Lists"
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
            tabBarBadge:badgeAdd,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="basket-plus-outline" color={color} size={24} />
            ),
          }}
        >{props=><Template screen="Plus" />}</Tab.Screen>
        <Tab.Screen
          name="Recycle"
          
          options={{
            tabBarLabel: 'Recycle',
            tabBarBadge:badgeRemove,
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
            tabBarBadge:badgeQr,
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
            tabBarBadge:badgeRefrigerator,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="texture-box" color={color} size={24} />
            ),
          }}
        >{props=><Template screen="Refrigerator" />}</Tab.Screen>
      
      </Tab.Navigator>
  )
    
}