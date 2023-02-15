import React, { useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Post from './Post'

const MessageBoard = () => {
  const styles = StyleSheet.create({
    center: {
      alignItems: 'center',
    },
  });
  const allPosts = [{
    profileImageURL:
        'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
      username: 'Jane',
      content: 'Hello! This is a test!',
      date: "Jan 1",
      time: "1 PM"
  },
 { profileImageURL:
        'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
      username: 'Doe',
      content: 'Goodbye!',
      date: "Jan 2",
      time: "4 PM"}
]
  const [posts, setPosts] = useState(allPosts)
    
    
      return (
        <View style={[styles.center, {top: 50}]}>
          <Text>Message Board:</Text>
        {posts.map((postData) => {
          
          return(<Post 
            styles = {styles}
            profileImageURL={postData.profileImageURL}
            username={postData.username}
            content={postData.content}
            date={postData.date}
            time={postData.time}
            />)
          
        })}
        </View>
      );
}

  
  export default MessageBoard;