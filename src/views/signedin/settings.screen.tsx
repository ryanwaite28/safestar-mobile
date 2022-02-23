import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useState } from 'react';



export default class UserSettingsScreen extends React.Component {
  props: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.props = props;
    this.state = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>User Settings</Text>
      </View>
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
