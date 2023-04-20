import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as db_operations from '../db_operations.js';

const ProfilePage = ({ navigation, route }) => {
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
    <View style={styles.container}>
      <View style={styles.profilePicContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Image
            source={require('../assets/images/dog_picture.jpg')}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{name}</Text>
      </View>
      <View style={styles.itemsContainer}>
        <View style={styles.followersContainer}>
          <Text style={styles.followers}>Followers</Text>
        </View>
        <View style={styles.followingContainer}>
          <Text style={styles.following}>Following</Text>
        </View>
        <View style={styles.charmaContainer}>
          <Text style={styles.charma}>Charma</Text>
        </View>
      </View>
      <View style={styles.itemsNumContainer}>
        <View style={styles.followersNumContainer}>
          <Text style={styles.followersNum}>76</Text>
        </View>
        <View style={styles.followingNumContainer}>
          <Text style={styles.followingNum}>142</Text>
        </View>
        <View style={styles.charmaNumContainer}>
          <Text style={styles.charmaNum}>{likes}</Text>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <View style={styles.bioContainerBold} >
          <Text style={styles.bio}>
            Bio
          </Text>
        </View>
        <View style={styles.bioTextContainer}>
          <Text style={styles.bioText}>
            i am a cool person.
          </Text>
        </View>
      </View>
      <View style={styles.memoriesContainer}>
        <View style={styles.urMemoriesContainer}>
          <Text style={styles.urMemories}>Your Memories</Text>
        </View>
        <View style={styles.visibleContainer}>
          <Text style={styles.visible}>(visible only to you)</Text>
        </View>
      </View>
      {username === current_username &&
        (<TouchableOpacity
          onPress={handleLogout}
        // style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 20 }}
        >
          {/* <Text>Log out</Text> */}
        </TouchableOpacity>)
      }
      {username != current_username &&
        (<TouchableOpacity
          onPress={handleFollow}
        // style={{
        //   backgroundColor: isFollowing ? 'gray' : 'blue',
        //   padding: 10,
        //   borderRadius: 5,
        //   marginTop: 20,
        // }}
        >
          <Text>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
        </TouchableOpacity>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePicContainer: {
    marginTop: 75,
    alignItems: 'center',
  },
  profilePicture: {
    height: 160,
    width: 160,
    borderRadius: 80,
  },
  usernameContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  username: {
    color: '#464646',
    fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemsContainer: {
    flexDirection: 'row',
    marginTop: 60,
  },
  followersContainer: {
    marginLeft: 40,
  },
  followers: {
    color: '#616161',
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
  },
  followingContainer: {
    marginLeft: 40,
  },
  following: {
    color: '#616161',
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
  },
  charmaContainer: {
    marginLeft: 40,
  },
  charma: {
    color: '#616161',
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemsNumContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  followersNumContainer: {
    marginLeft: 70,
  },
  followersNum: {
    color: '#969696',
    opacity: 0.52,
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
  },
  followingNumContainer: {
    marginLeft: 95,
  },
  followingNum: {
    color: '#969696',
    opacity: 0.52,
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
  },
  charmaNumContainer: {
    marginLeft: 93,
  },
  charmaNum: {
    color: '#969696',
    opacity: 0.52,
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
  },
  bioContainer: {
    marginLeft: 10,
    marginTop: 30,
  },
  bioContainerBold: {
    marginLeft: 30,
  },
  bio: {
    color: '#616161',
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
  },
  bioTextContainer: {
    marginLeft: 60,
  },
  bioText: {
    color: '#969696',
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
  },
  memoriesContainer: {
    marginTop: 30,
    marginLeft: 40,
  },
  urMemories: {
    color: '#616161',
    fontFamily: 'Arial',
    fontSize: 17,
    fontWeight: 'bold',
  },
  visibleContainer: {
    marginTop: 3,
  },
  visible: {
    color: '#999999',
    fontFamily: 'Arial',
    fontSize: 11,
    marginLeft: 7,
    fontWeight: 'bold',
  },
});


export default ProfilePage;