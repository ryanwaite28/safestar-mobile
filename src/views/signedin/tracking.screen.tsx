import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React from 'react';
import { UsersService } from '../../services/users.service';
import { UserStoreService } from '../../services/user-store.service';
import { PlainObject } from '../../interfaces/json-object.interface';



export default class UserTrackingScreen extends React.Component {
  props: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.props = props;
    this.state = null;
  }

  componentDidMount() {
    const you = UserStoreService.getLatestState();
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>User Tracking</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  welcomeLogo: {
    width: 300, 
    height: 300,
  },
});