import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useState } from 'react';
import { StylesConstants } from '../services/styles.constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function WelcomeScreen(props: any) {
  // console.log(props);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/safe-star-logo-500.png')}
        style={styles.welcomeLogo}
      />

      <Button 
        onPress={() => props.navigation.navigate('SignUp')}
        title="Sign Up"
        color={StylesConstants.APP_PRIMARY_COLOR}
      />

      <Button 
        onPress={() => props.navigation.navigate('SignIn')}
        title="Sign In"
        color={StylesConstants.APP_SECONDARY_COLOR}
      />

      <StatusBar style="auto" />
    </View>
  );
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
