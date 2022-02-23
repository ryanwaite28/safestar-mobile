import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useState } from 'react';
import { StylesConstants } from '../services/styles.constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// https://icons.expo.fyi/
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

import UserHomeScreen from './signedin/home.screen';
import UserPulseScreen from './signedin/pulse.screen';
import UserSettingsScreen from './signedin/settings.screen';
import UserCheckpointScreen from './signedin/checkpoint.screen';
import UserTrackingScreen from './signedin/tracking.screen';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export default class SignedInView extends React.Component {
  props: any;

  constructor(props: any) {
    super(props);
    this.props = props;
    // console.log(this);
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={UserHomeScreen} options={tabBarOptions.home} />
          <Tab.Screen name="Pulse" component={UserPulseScreen} options={tabBarOptions.pulse} />
          <Tab.Screen name="CheckPoint" component={UserCheckpointScreen} options={tabBarOptions.checkpoint} />
          <Tab.Screen name="Tracking" component={UserTrackingScreen} options={tabBarOptions.tracking} />
          <Tab.Screen name="Settings" component={UserSettingsScreen} options={tabBarOptions.settings} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeLogo: {
    width: 300, 
    height: 300,
  },
});

const tabBarOptions: {
  [key:string]: BottomTabNavigationOptions,
} = {
  home: {
    tabBarIcon: () => <Ionicons name="md-home" size={24} color={StylesConstants.APP_PRIMARY_COLOR} />,
    tabBarActiveTintColor: StylesConstants.APP_PRIMARY_COLOR,
    headerShown: false
  },
  pulse: {
    tabBarIcon: () => <AntDesign name="heart" size={24} color={StylesConstants.APP_PRIMARY_COLOR} />,
    tabBarActiveTintColor: StylesConstants.APP_PRIMARY_COLOR,
  },
  checkpoint: {
    tabBarIcon: () => <AntDesign name="check" size={24} color={StylesConstants.APP_PRIMARY_COLOR} />,
    tabBarActiveTintColor: StylesConstants.APP_PRIMARY_COLOR,
  },
  tracking: {
    tabBarIcon: () => <AntDesign name="enviroment" size={24} color={StylesConstants.APP_PRIMARY_COLOR} />,
    tabBarActiveTintColor: StylesConstants.APP_PRIMARY_COLOR,
  },
  settings: {
    tabBarIcon: () => <Ionicons name="md-settings" size={24} color={StylesConstants.APP_PRIMARY_COLOR} />,
    tabBarActiveTintColor: StylesConstants.APP_PRIMARY_COLOR,
  },
};
