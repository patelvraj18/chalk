import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as db_operations from '../db_operations.js';

const MessageBoard = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [likedResponseIDs, setLikedResponseIDs] = useState([]);
  const [inputText, setInputText] = useState('');
  const [promptText, setPromptText] = useState('');
  const [promptID, setPromptID] = useState('');
  const {username} = route.params;
  useEffect(() => {
    db_operations.getPrompt().then(prompt => {
      setPromptText(prompt.text);
      setPromptID(prompt.promptID);

      db_operations.getResponses(prompt.promptID).then(messages => {
        setMessages(messages);
      });
      db_operations.getLikedMessages(username).then(likedMessages =>{
       setLikedResponseIDs(likedMessages)
      });
    });
  }, []);

  const handleSend = async () => {
    const userID = username; // replace with your actual userID
    const responseID = await db_operations.respondToPrompt(
      userID,
      inputText,
      promptID,
    );
    const newMessage = {
      userID: username,
      text: inputText,
      responseID: responseID,
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleLike = async (username, promptID, responseID) => {
    console.log(likedResponseIDs)
    db_operations.incrementLike(promptID, responseID)
    const newLikedResponseIDs = await db_operations.handleLike(username,promptID, responseID)
    console.log('liked responmes',newLikedResponseIDs)
    setLikedResponseIDs(newLikedResponseIDs);
    db_operations.getResponses(promptID).then(messages => {
      setMessages(messages);
    });
  };
  const handleDislike = async (username, promptID, responseID) => {
    console.log(likedResponseIDs)
    db_operations.decrementLike(promptID, responseID)
    const newLikedResponseIDs = await db_operations.handleDislike(username,promptID, responseID)
    console.log('disliked responmes',newLikedResponseIDs)
    setLikedResponseIDs(newLikedResponseIDs);
    db_operations.getResponses(promptID).then(messages => {
      setMessages(messages);
    });
  };

  const handleLongPress = async (username, promptID, responseID) => {
    if (likedResponseIDs.includes(responseID)) {
      await handleDislike(username, promptID, responseID)
    } else {
      await handleLike(username, promptID, responseID)
    }
  }
  
  const handleReply = (responseText, responseID, userID) => {
    db_operations.getResponses(promptID).then(() => {
      navigation.navigate('ReplyScreen', {
        responseText,
        promptID,
        responseID,
        userID,
        username,
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>{promptText}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.messageContainer}>
          {messages.map((message, index) => (
            <View key={index}
            style={[
              styles.message,
              likedResponseIDs != undefined && likedResponseIDs.includes(message.responseID) && styles.likedMessage,
            ]}>
              <TouchableOpacity
                onLongPress={() => {
                  handleLongPress(username, promptID, message.responseID)
                  }
                }
                onPress={() => {
                    handleReply(message.text, message.responseID, message.userID)
                  }
                }>
                <Text style={styles.username}>{message.userID}</Text>
                <Text style={styles.messageText}>{message.text}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputText(text)}
          value={inputText}
          placeholder="Add a comment..."
        />
        <Button title="Post" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 20,
  },
  message: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  likedMessage: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default MessageBoard;
