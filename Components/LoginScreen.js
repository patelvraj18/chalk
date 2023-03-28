import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { darkColors, Image } from '@rneui/themed';
import { Text } from 'react-native';
import { getUsername } from '../db_operations';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/firebase/config';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('Please enter an email and password.');
        return;
      }
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (!userCredentials.user.emailVerified) {
        setError('Please verify your email first.');
        return;
      }
      const username = await getUsername(email);
      navigation.navigate('MessageBoard', { username });
    } catch (error) {
      setError('Log In Failed -> ' + error.message);
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
            source={require('../assets/images/login..png')}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.textWelcome}>Your Chalk experience awaits you!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="EMAIL"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCorrect={false}
            placeholder="PASSWORD"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <View style={styles.forgotContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color={theme.lightColors.secondary}
            title="Log In" onPress={handleLogin}
          />
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUp}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign up')}>
            <Text style={styles.signLink}> Sign Up.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: theme.lightColors.secondary,
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
    fontSize: 13.5,
    fontFamily: 'Arial',
  },
  inputContainer: {
    padding: 10,
    fontFamily: 'Arial',
    alignItems: 'center',
  },
  input: {
    width: '90%',
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
    fontFamily: 'Arial',
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
  },
  forgotContainer: {
    position: 'absolute',
    right: 48,
    bottom: 350,
  },
  forgot: {
    color: theme.navigationColors.primary,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 255,
    left: 45,
    width: 300,
    height: 55,
    paddingTop: 9,
    backgroundColor: theme.lightColors.primary,
    borderRadius: 50,
  },
  signUpContainer: {
    position: 'absolute',
    bottom: 35,
    right: 105,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUp: {
    color: theme.darkColors.secondary,
    fontSize: 13,
    fontFamily: 'Arial',
  },
  signLink: {
    color: theme.navigationColors.primary,
    fontSize: 13,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
});


export default LoginScreen;
