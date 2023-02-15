import React from 'react';
import {Text, View} from 'react-native';

const Post = ({styles, profileImageURL, username, content, date, time}) => {
    console.log("Test")
    return (
        <View style={styles.center}>
          <Text>Profile Image: {profileImageURL}</Text>
          <Text>User: {username}</Text>
          <Text>{content}</Text>
          <Text>Posted: {date} at {time}</Text>

        </View>
       
      );
}

export default Post;