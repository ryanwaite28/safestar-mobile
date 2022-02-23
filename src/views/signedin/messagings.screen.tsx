
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { UsersService } from '../../services/users.service';
import { UserStoreService } from '../../services/user-store.service';
import { PlainObject } from '../../interfaces/json-object.interface';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDateUi, getUserFullName } from '../../utils/common.utils';
import { StylesConstants } from '../../services/styles.constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IMessaging } from '../../interfaces/messages.interface';
import { IUser } from '../../interfaces/user.interface';
import { getUserIcon } from '../../fragments/user-icon.fragment';



export default class UserMessagingsScreen extends React.Component {
  props: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.props = props;
    this.state = {
      messagings: []
    };
  }

  componentDidMount() {
    const you = UserStoreService.getLatestState();
    UsersService.get_user_messagings(you!.id, undefined, true).subscribe({
      next: (response: any) => {
        // const messagings_list = [];
        // for (const messaging of response.data) {
        //   messagings_list.unshift(messaging);
        // }
        this.setState({
          messagings: response.data
        }, () => {
          // console.log(this);
        });
      },
      error: (error: any) => {
        console.log(error);
        console.log(`Could not load messages...`);
        Alert.alert(`Could not load messages...`);
      }
    });
  }

  render() {
    const you = UserStoreService.getLatestState();

    return (
      <ScrollView style={styles.container}>
        {
          this.state.messagings.map((messaging: IMessaging) => {
            const other_user: IUser = messaging.sender_id === you!.id ? messaging.user! : messaging.sender!;

            return (
              <TouchableOpacity key={messaging.id} style={styles.messagingContainer} onPress={() => this.props.navigation.navigate(`HomeMessages`, {
                messaging,
                other_user,
              })}>
                <View style={styles.messagingImageContainer}>
                  {getUserIcon(other_user, styles.userIcon)}
                </View>

                <View style={styles.messagingTextContainer}>
                  <View style={styles.flexRow}>
                    <Text style={styles.userName}>
                      {getUserFullName(other_user)}
                    </Text>

                    {
                      !!messaging.unread_messages_count && <Text style={styles.unreadCount}>
                        {messaging.unread_messages_count}
                      </Text>
                    }
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },

  welcomeLogo: {
    width: 300, 
    height: 300,
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },

  messagingContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: StylesConstants.LIGHT_GREY,
    padding: 10,
    marginVertical: 4,
    // marginHorizontal: 16,
  },

  messagingImageContainer: {
    marginRight: 12,
  },

  messagingTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  userIcon: {
    width: 50, 
    height: 50,
    borderRadius: 100,
  },

  userName: {
    fontSize: 18,
    marginRight: 12,
  },

  unreadCount: {
    borderRadius: 8,
    backgroundColor: StylesConstants.APP_PRIMARY_COLOR,
    padding: 4,
    color: `#fff`,
  }
});
