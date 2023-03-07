import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {Image} from '@rneui/themed';
import {getUsername} from '../db_operations';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../src/firebase/config';

const LoginScreen = ({navigation}) => {
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/login..png')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 20,
    padding: 10,
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
    width: 175,
    height: 175,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
