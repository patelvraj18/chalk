import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {Image} from '@rneui/themed';
import {Text} from 'react-native';
import {getUsername} from '../db_operations';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../src/firebase/config';
import {ThemeProvider, createTheme} from '@rneui/themed';

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

// const CustomTextInput = (props) => (<TextInput autoCapitalize="none" ...props />)

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        console.log('Please enter an email and password.');
        return;
      }
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (!userCredentials.user.emailVerified) {
        console.log('Please verify your email first.');
        return;
      }
      const username = await getUsername(email);
      navigation.navigate('MessageBoard', {username});
    } catch (error) {
      console.log('Login failed:', error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/login..png')}
          />
        </View>
        <View>
          <Text style={styles.text1}>Welcome back to Chalk!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCorrect={false}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
          />
          <Button
            style={styles.button}
            title="Login" onPress={handleLogin}
          />
        </View>
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 20,
    padding: 10,
    fontFamily: 'Arial',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginRight: 120,
    paddingBottom: 30,
  },
  text1: {
    color: theme.darkColors.secondary,
    fontSize: 15,
    fontFamily: 'Arial',
    marginRight: 145,
  },
  button: {

  },
});

export default LoginScreen;
