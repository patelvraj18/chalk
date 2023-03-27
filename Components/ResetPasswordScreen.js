import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../src/firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate('Login');
    } catch (error) {
      setError('Failed to send password reset email: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="EMAIL"
        autoCapitalize="none"
      />
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 7,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 13,
  },
  errorContainer: {
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;