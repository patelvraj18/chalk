import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { auth } from '../src/firebase/config';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import * as db_operations from '../db_operations.js';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { Image } from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: '#979797',
    secondary: '#ffffff',
  },
  darkColors: {
    primary: '#555454',
    secondary: '#757373',
  },
  navigationColors: {
    primary: '#5c64b0',
  },
  mode: 'light',
});

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
      db_operations.setUsername(username, userCredential);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/signup.png')}
        />
      </View>
      <View style={styles.container}>
        <Input
          style={[styles.user, styles.input]}
          autoCorrect={false}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
        />
        <Input
          style={[styles.email, styles.input]}
          autoCorrect={false}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <Input
          style={[styles.password, styles.input]}
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
        />
        <Button
          title="Sign Up" onPress={handleSignup}
          buttonStyle={{
            width: 300,
            height: 60,
            backgroundColor: theme.darkColors.primary,
            borderRadius: 15,
            marginLeft: 18,
            fontFamily: 'Arial',
          }} />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 100,
    marginLeft: 20,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    fontSize: 13,
    paddingLeft: 3,
    fontFamily: 'Arial',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 13,
  },
});
