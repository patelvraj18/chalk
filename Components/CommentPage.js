import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
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

const CommentPage = ({ navigation, route }) => {
  const { username } = route.params;
  const [name, setName] = useState(username); // account name
  const [inputText, setInputText] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [voiceMemoUri, setVoiceMemoUri] = useState('');

  const handleComment = () => {
    // submit the comment to the main thread board

    navigation.navigate('MessageBoard');
  };

  const handleImage = async () => {
    // implement image picker logic using a third-party library like react-native-image-picker

  };

  const handleVoiceMemoRecorder = async () => {
    // implement voice memo recorder logic using a third-party library like react-native-audio-recorder-player

  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.commentInput}
        placeholder="Feel free to share!"
        value={inputText}
        onChangeText={text => setInputText(text)}
      />
      <TouchableOpacity style={styles.imagePickerButton} onPress={handleImage}>
        <Text>Add Photo</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
      <TouchableOpacity style={styles.voiceMemoRecorderButton} onPress={handleVoiceMemoRecorder}>
        <Text>Record Voice Memo</Text>
      </TouchableOpacity>
      {voiceMemoUri && <Text>{voiceMemoUri}</Text>}
      <TouchableOpacity style={styles.submitButton} onPress={handleComment}>
        <Text>Submit Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  commentInput: {
    height: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'left',
    textAlignVertical: 'top',

  },
  imagePickerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  voiceMemoRecorderButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  submitButton: {
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommentPage;
