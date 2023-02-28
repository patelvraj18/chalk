import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Image, Button, ThemeProvider, createTheme} from '@rneui/themed';
import * as db_operations from '../db_operations.js';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 175,
    height: 175,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    margin: 20,
    padding: 10,
  },
  button: {
    width: 150,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

const Home = ({navigation}) => {
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            source={require('../assets/images/chalk..png')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={{
              width: 150,
              height: 60,
              backgroundColor: theme.lightColors.primary,
            }}
            onPress={() => navigation.navigate('Login')}
            title="Log In"
            radius="50"
            titleStyle={{
              color: theme.lightColors.secondary,
            }}></Button>
        </View>
      </View>
    </ThemeProvider>
  );
};

export default Home;
