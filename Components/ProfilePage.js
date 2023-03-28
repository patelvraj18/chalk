import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

const ProfilePage = () => {
  const [name, setName] = useState("John Smith"); // account name
  const [questions, setQuestions] = useState([]); // array of past questions answered
  const [likes, setLikes] = useState(0); // number of likes user has gotten

  const handleNameChange = (text) => {
    setName(text);
  }

  const handleLogout = () => {
    // code to log out user from the app
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={{ uri: 'https://placekitten.com/200/200' }} // replace with user's profile picture
        style={{ width: 150, height: 150, borderRadius: 75 }}
      />
      <Text style={{ fontSize: 24, marginTop: 20 }}>{name}</Text>
      <TextInput
        value={name}
        onChangeText={handleNameChange}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, margin: 20, width: '80%' }}
      />
      <Text style={{ fontSize: 18, marginVertical: 10 }}>Questions you've answered:</Text>
      {questions.map((question, index) => (
        <Text key={index}>{question}</Text>
      ))}
      <Text style={{ fontSize: 18, marginVertical: 10 }}>Likes received: {likes}</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 20 }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfilePage;