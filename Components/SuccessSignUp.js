import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { Button } from 'react-native';

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

const SuccessSignUp = ({ navigation }) => {
  const handleGoToSignup = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Sign-up successful! </Text>
      </View>
      <View style={styles.main}>
        <Text style={styles.mainText}> Thank you for signing up. Please check your email to verify your account before logging in.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button color={theme.lightColors.secondary} title="TO LOG IN ->" onPress={handleGoToSignup} />
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
  header: {
    position: 'absolute',
    top: 170,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    right: 20,
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: theme.darkColors.primary,
  },
  main: {
    position: 'absolute',
    top: 230,
    right: 56,
    width: '80%',
  },
  mainText: {
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    fontSize: 17,
    textAlign: 'center',
    color: theme.darkColors.secondary,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 360,
    left: 45,
    width: 300,
    height: 55,
    paddingTop: 9,
    backgroundColor: theme.lightColors.primary,
    borderRadius: 50,
  },
});

export default SuccessSignUp;

