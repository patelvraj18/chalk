import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import * as db_operations from '../db_operations.js';

const ProfilePage = ({navigation, route}) => {
  const username = route.params.username
  const current_username = route.params.current_username
  console.log('username', username);
  console.log('current_username', current_username);
  const [name, setName] = useState(username); // account name
  const [questions, setQuestions] = useState([]); // array of past questions answered
  const [likes, setLikes] = useState(0); // number of likes user has gotten
  const [isFollowing, setIsFollowing] = useState(false);
 

  useEffect(() => {
    setName(username)
    db_operations.getKarma(username).then(karma => {
      setLikes(karma)
    });
    let timerId = setInterval(() => {
      db_operations.getKarma(username).then(karma => {
        setLikes(karma)
      });
    }, 5000); 
    const checkFollowingStatus = async () => {
      const isUserFollowing = await db_operations.isFollowing(current_username, username);
      setIsFollowing(isUserFollowing);

    };
    checkFollowingStatus();
    return () => clearInterval(timerId);
  }, [username, current_username, likes]);

  const handleNameChange = (text) => {
    setName(text);
  }

  const handleLogout = () => {
    navigation.navigate('Home')
  }
  const handleFollow = async () => {
    if (isFollowing) {
      await db_operations.unfollowUser(current_username, username);
    } else {
      await db_operations.followUser(current_username, username);
    }
    setIsFollowing(!isFollowing);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={{ uri: 'https://placekitten.com/200/200' }} // replace with user's profile picture
        style={{ width: 150, height: 150, borderRadius: 75 }}
      />
      <Text style={{ fontSize: 24, marginTop: 20 }}>{name}</Text>
      {/* <TextInput
        value={name}
        onChangeText={handleNameChange}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, margin: 20, width: '80%' }}
      /> */}
      {/* <Text style={{ fontSize: 18, marginVertical: 10 }}>Questions you've answered:</Text>
      {questions.map((question, index) => (
        <Text key={index}>{question}</Text>
      ))} */}
      <Text style={{ fontSize: 18, marginVertical: 10 }}>Likes sd dsfdsdsreceived: {likes}</Text>
      {username === current_username && 
      (<TouchableOpacity
        onPress={handleLogout}
        style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 20 }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Log out</Text>
      </TouchableOpacity>)
      }
      {username != current_username &&
        (<TouchableOpacity
        onPress={handleFollow}
        style={{
          backgroundColor: isFollowing ? 'gray' : 'blue',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
      </TouchableOpacity>)
      }
    </View>
  );
}

export default ProfilePage;