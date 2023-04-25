import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../src/firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Image } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeProvider, createTheme } from '@rneui/themed';

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

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate('SuccessResetPassword');
    } catch (error) {
      setError('Please enter your email -> ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image
            style={styles.icon}
            source={require('../assets/images/back_arrow.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}> Forgot your password? </Text>
      </View>
      <View style={styles.main}>
        <Text style={styles.mainText}> Enter your email and we'll send you a link to reset your password!</Text>
      </View>
      <View styles={styles.emailBox}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="ACCOUNT EMAIL"
          autoCapitalize="none"
        />
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        <Button color={theme.lightColors.secondary} title="RESET PASSWORD" onPress={handleResetPassword} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 55,
    left: 30,
  },
  icon: {
    width: 30,
    height: 30,
  },
  header: {
    position: 'absolute',
    top: 170,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    right: 15,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
    color: theme.darkColors.primary,
  },
  main: {
    position: 'absolute',
    top: 230,
    right: 50,
    width: '85%',
  },
  mainText: {
    fontFamily: 'InriaSans-Bold',
    fontStyle: 'italic',
    fontSize: 13,
    textAlign: 'center',
    color: theme.darkColors.secondary,
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 7,
    paddingHorizontal: 15,
    marginBottom: 15,
    marginLeft: 15,
    fontSize: 13,
    fontFamily: 'InriaSans-Regular',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 235,
    right: 30,
    width: '95%',
    alignItems: 'center',
  },
  errorText: {
    color: theme.navigationColors.secondary,
    fontFamily: 'InriaSans-Bold',
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 330,
    left: 45,
    width: 300,
    height: 55,
    paddingTop: 9,
    backgroundColor: theme.lightColors.primary,
    borderRadius: 50,
  },
});

export default ResetPasswordScreen;