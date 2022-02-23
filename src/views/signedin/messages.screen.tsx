
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { UsersService } from '../../services/users.service';
import { UserStoreService } from '../../services/user-store.service';
import { PlainObject } from '../../interfaces/json-object.interface';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDateUi, getUserFullName } from '../../utils/common.utils';
import { StylesConstants } from '../../services/styles.constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IMessage } from '../../interfaces/messages.interface';
import { getUserIcon } from '../../fragments/user-icon.fragment';
import { IUser } from '../../interfaces/user.interface';



export default class UserMessagesScreen extends React.Component {
  props: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.props = props;
    this.state = {
      messages_list: [],
      message_input: ``,
    };
    // console.log(this);
    const title = getUserFullName(this.props.route.params.other_user);
    this.props.navigation.setOptions({ title });
  }

  componentDidMount() {
    this.getMessagesAll();
  }

  getMessagesAll() {
    const min_id =
      this.state.messages_list.length &&
      this.state.messages_list[0].id;

    const other_user = this.props.route.params.other_user;
    const you = UserStoreService.getLatestState();

    UsersService.get_user_messages_all(
      you!.id,
      other_user.id,
    ).subscribe({
      next: (response: any) => {
        this.setState({
          messages_list: response.data
        }, () => {
          console.log(this);
        });
      },
      error: (error: any) => {
        console.log(error);
        console.log(`Could not load messages...`);
        Alert.alert(`Could not load messages...`);
      }
    });
  }

  renderYourMessage(message: IMessage) {
    const you = UserStoreService.getLatestState()!;
    
    return (
      <View key={message.id} style={styles.youMessageContainer} >
        <View style={styles.messagingTextContainer}>
          <View>
            <Text style={{...styles.messageBody, textAlign: 'right'}}>
              {message.body}
            </Text>

            <Text style={{...styles.timeText, textAlign: 'right'}}>
              {formatDateUi(message.created_at)}
            </Text>
          </View>
        </View>

        <View style={styles.youMessageImageContainer}>
          {getUserIcon(you, styles.userIcon)}
        </View>

      </View>
    );
  }

  renderOtherUserMessage(message: IMessage) {
    const other_user: IUser = this.props.route.params.other_user;
    
    return (
      <View key={message.id} style={styles.otherUserMessageContainer} >
        <View style={styles.otherUserMessageImageContainer}>
          {getUserIcon(other_user, styles.userIcon)}
        </View>

        <View style={styles.messagingTextContainer}>
          <View>
            <Text style={styles.messageBody}>
              {message.body}
            </Text>

            <Text style={styles.timeText}>
              {formatDateUi(message.created_at)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const you = UserStoreService.getLatestState()!;

    return (
      <View style={styles.container}>
        {
          this.state.messages_list.map((message: IMessage) => {
            return message.from_id === you.id
              ? this.renderYourMessage(message)
              : this.renderOtherUserMessage(message)
          })
        }
      </View>
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

  youMessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: StylesConstants.LIGHT_GREY,
    padding: 10,
    marginVertical: 4,
    // marginHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  otherUserMessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: StylesConstants.LIGHT_GREY,
    padding: 10,
    marginVertical: 4,
    // marginHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  otherUserMessageImageContainer: {
    marginRight: 12,
  },
  youMessageImageContainer: {
    marginLeft: 12,
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

  messageBody: {
    fontSize: 18,
    marginRight: 12,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 12,
  },

  unreadCount: {
    borderRadius: 8,
    backgroundColor: StylesConstants.APP_PRIMARY_COLOR,
    padding: 4,
    color: `#fff`,
  }
});
