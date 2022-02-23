import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { StylesConstants } from '../services/styles.constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UsersService } from '../services/users.service';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function SignInScreen(props: any) {
  // console.log(props);

  const [email_or_username, onChangeEmailOrUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const signIn = () => {
    const data = {
      email_or_username,
      password
    };
    // console.log(`calling...`, data);
    UsersService.sign_in(data).subscribe({
      next: (response) => {
        // console.log(`next called`, response);
        // response.message && Alert.alert(response.message);
      },
      error: (error) => {
        error.message && Alert.alert(error.message);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <Text>Sign In</Text>

      <TextInput
        style={styles.input} 
        onChangeText={onChangeEmailOrUsername} 
        value={email_or_username} 
        placeholder="Email or Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
        placeholder='Password'
      />

      <Button 
        onPress={signIn}
        title="Submit"
        color={StylesConstants.APP_PRIMARY_COLOR}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
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
    width: 100, 
    height: 100,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: `90%`
  },
});
