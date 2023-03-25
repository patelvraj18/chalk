import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import * as db_operations from '../db_operations.js';

const ReplyScreen = ({route}) => {
  const {responseText, responseID, responseUserID, username} = route.params;
  const [response, setResponse] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    setResponse(responseText);
    db_operations.getComments(responseID).then(comments => {
      setComments(comments);
    });
  }, []);

  const handleSubmitComment = () => {
    if (commentText.trim() !== '') {
      db_operations.replyToResponse(username, commentText, responseID);
      setComments([...comments, {userID: username, text: commentText}]);
      setCommentText('');
    }
  };

  return (
    <View style={styles.container}>
      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.username}>{responseUserID}</Text>
          <Text style={styles.responseText}>{responseText}</Text>
        </View>
      )}
      <ScrollView style={styles.scrollView}>
        {comments.map((comment, index) => (
          <View key={index} style={styles.comment}>
            <Text style={styles.username}>{comment.userID}</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment"
          value={commentText}
          onChangeText={text => setCommentText(text)}
        />
        <Button title="Submit" onPress={handleSubmitComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  responseContainer: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  responseText: {
    fontSize: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  comment: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default ReplyScreen;
