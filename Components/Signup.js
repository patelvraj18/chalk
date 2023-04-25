/* eslint-disable react-native/no-inline-styles */
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';
import { Text } from 'react-native';

const theme = createTheme({
  lightColors: {
    primary: '#979797',
    secondary: '#ffffff',
  },
  darkColors: {
    primary: '#555454',
    secondary: '#757373',
    tertiary: '#D9D9D9',
  },
  navigationColors: {
    primary: '#5c64b0',
    secondary: '#E47F7F',
  },
  mode: 'light',
});

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      if (!username || !email || !password) {
        setError('Please enter a username, email, and password.');
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
      db_operations.setUsername(username, userCredential);
      navigation.navigate('SuccessSignUp');
    } catch (error) {
      setError('Sign Up Failed -> ' + error.message);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              style={styles.icon}
              source={require('../assets/images/x-icon.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/signup.png')}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.textWelcome}>Welcome to Chalk!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            placeholder="USERNAME"
            onChangeText={setUsername}
            value={username}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            placeholder="EMAIL"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            placeholder="PASSWORD"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Button
            title="Sign Up" onPress={handleSignup}
            color={theme.lightColors.secondary}
            buttonStyle={{
              width: 300,
              height: 55,
              paddingTop: 9,
              borderRadius: 50,
              backgroundColor: theme.darkColors.primary,
              marginTop: 20,
              marginLeft: 23,
              fontFamily: 'InriaSans-Bold',
              fontSize: 13,
            }} />
        </View>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <View style={styles.logInContainer}>
          <Text style={styles.logIn}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logLink}>  Log in.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    fontFamily: 'InriaSans-Bold',
  },
  iconContainer: {
    position: 'absolute',
    top: 55,
    right: 30,
  },
  icon: {
    width: 18,
    height: 18,
  },
  imageContainer: {
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 115,
    left: 50,
    height: '18%',
  },
  image: {
    width: 235,
    height: 200,
    resizeMode: 'contain',
  },
  welcomeContainer: {
    position: 'absolute',
    top: 265,
    left: 50,
  },
  textWelcome: {
    color: theme.darkColors.secondary,
    fontFamily: 'InriaSans-Bold',
    fontSize: 14,
  },
  inputContainer: {
    padding: 10,
    fontFamily: 'InriaSans-Bold',
    alignItems: 'center',
    marginTop: 100,
  },
  input: {
    width: '90%',
    fontFamily: 'InriaSans-Bold',
    height: 40,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 7,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: theme.darkColors.tertiary,
    color: theme.darkColors.secondary,
    fontSize: 13,
  },
  errorContainer: {
    position: 'absolute',
    bottom: 175,
    right: 25,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: theme.navigationColors.secondary,
    fontFamily: 'InriaSans-Bold',
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
  },
  logInContainer: {
    position: 'absolute',
    bottom: 40,
    left: 75,
    flexDirection: 'row',
  },
  logIn: {
    color: theme.lightColors.primary,
    fontFamily: 'InriaSans-Bold',
  },
  logLink: {
    color: theme.navigationColors.primary,
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
});
