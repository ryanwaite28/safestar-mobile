import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SignedOutView from './src/views/signedout.view';
import { UserStoreService } from './src/services/user-store.service';
import { IUser } from './src/interfaces/user.interface';
import { UsersService } from './src/services/users.service';
import SignedInView from './src/views/signedin.view';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    UsersService.checkUserSession().subscribe({
      next: (you) => {
        // console.log({ you });
        // console.log(`setting signed in state...`);
        setSignedIn(!!you);
      }
    });
  });

  return (
    <>
      <StatusBar style="auto" />

      {isSignedIn === null
        ? (
          <View style={styles.container}>
            <Image
              source={require('./assets/safe-star-logo-500.png')}
              style={styles.welcomeLogo}
            />
          </View>
        ) :
        isSignedIn
        ? (
          <SignedInView />
        ) : (
          <SignedOutView />
        )}
    </>
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
