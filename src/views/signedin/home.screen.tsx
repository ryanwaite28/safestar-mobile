import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { UsersService } from '../../services/users.service';
import { UserStoreService } from '../../services/user-store.service';
import { PlainObject } from '../../interfaces/json-object.interface';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserFullName } from '../../utils/common.utils';
import { StylesConstants } from '../../services/styles.constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserHomeInfoScreen from './info.screen';
import UserSettingsScreen from './settings.screen';
import UserMessagesScreen from './messages.screen';
import UserMessagingsScreen from './messagings.screen';



const Stack = createNativeStackNavigator();

export default class UserHomeScreen extends React.Component {
  props: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.props = props;
    this.state = null;
  }

  render() {
    const you = UserStoreService.getLatestState();
    const stats = this.state?.stats || {};

    return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="HomeInfo" options={{title: 'Home'}} component={UserHomeInfoScreen} />
        <Stack.Screen name="HomeMessagings" options={{title: 'Messages'}} component={UserMessagingsScreen} />
        <Stack.Screen name="HomeMessages" options={{}} component={UserMessagesScreen} />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  userIcon: {
    width: 150, 
    height: 150,
    marginBottom: 24,
  },

  headerText: {
    fontSize: 36,
    // marginBottom: 4,
  },
  usernameText: {
    fontSize: 24,
    marginBottom: 12,
    color: StylesConstants.APP_SECONDARY_COLOR
  },

  item: {
    backgroundColor: StylesConstants.LIGHT_GREY,
    padding: 10,
    marginVertical: 4,
    // marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 12,
  },
});
