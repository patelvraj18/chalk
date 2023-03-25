import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from '@rneui/themed';
import {auth} from '../src/firebase/config';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import * as db_operations from '../db_operations.js';

export default function Signup({navigation}) {
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
    <View style={styles.container}>
      <Input
        style={styles.user}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <Input
        style={styles.email}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <Input
        style={styles.password}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Sign up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    paddingLeft: 3,
  },
});
