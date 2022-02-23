import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { UsersService } from '../../services/users.service';
import { UserStoreService } from '../../services/user-store.service';
import { PlainObject } from '../../interfaces/json-object.interface';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserFullName } from '../../utils/common.utils';
import { StylesConstants } from '../../services/styles.constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

export default class UserHomeInfoScreen extends React.Component {
  props: any;
  state: any;
  sections = [
    {
      id: 'messages-item',
      label: 'Messages',
      navigation: 'HomeMessagings',
    },
  ];

  constructor(props: any) {
    super(props);
    this.props = props;
    this.state = null;
  }

  componentDidMount() {
    const you = UserStoreService.getLatestState();
    UsersService.get_user_home_page_stats(you!.id).subscribe({
      next: (response) => {
        this.setState({
          stats: response.data!
        }, () => {
          // console.log(`UserHomeScreen`, this);
        });
      }
    });
  }

  renderItem (item: any) {
    return (
      <TouchableOpacity key={item.id} style={styles.item} onPress={() => this.props.navigation.navigate(item.navigation)}>
        <Text style={styles.itemTitle}>{item.label}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const you = UserStoreService.getLatestState();
    const stats = this.state?.stats || {};

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>{ getUserFullName(you!) }</Text>
        <Text style={styles.usernameText}>@{ you!.username }</Text>

        <Image style={styles.userIcon} source={{uri: you!.icon_link}} />

        <Text>Pulses Sent: { stats.pulses_count }</Text>
        <Text>Checkpoints Sent: { stats.checkpoints_sent_count }</Text>
        <Text>CheckPoints Received: { stats.checkpoints_received_count }</Text>
        <Text>Users Tracking You: { stats.trackers_count }</Text>
        <Text>Users You're Tracking: { stats.trackings_count }</Text>

        <View style={{marginTop: 24}}>
          {this.sections.map(item => this.renderItem(item))}
        </View>
      </ScrollView>
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
