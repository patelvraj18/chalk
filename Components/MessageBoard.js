import React, { useState, useEffect } from 'react';
import {
  Component,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as db_operations from '../db_operations.js';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { Dropdown } from 'react-native-material-dropdown';
import { SelectList } from 'react-native-dropdown-select-list'

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
  createCommentColors: {
    first: '#616161',
    second: '#ADADAD',
    third: '#777777',
    fourth: '#A7A7A7',
    fifth: '#DBDBDB',
    sixth: '#403F3F',
  },
  mode: 'light',
});

const MessageBoard = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [likedResponseIDs, setLikedResponseIDs] = useState([]);
  const [inputText, setInputText] = useState('');
  const [promptText, setPromptText] = useState('');
  const [promptID, setPromptID] = useState('');
  const SORTBYTOP = 0;
  const SORTBYNEW = 1;
  const SORTBYLOCATION = 2;
  const SORTBYOLD = 3;
  const [sortType, setSortType] = useState(SORTBYTOP);
  const { username } = route.params;
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: '1', value: 'best posts' },
    { key: '2', value: 'featured' },
    { key: '3', value: 'latest' },
  ]


  useEffect(() => {
    db_operations.getPrompt().then(prompt => {
      if ([prompt.text, prompt.promptID].includes(undefined)) {
        console.error("got undefined in useEffect")
      }
      setPromptText(prompt.text);
      setPromptID(prompt.promptID);

      db_operations.getResponses(prompt.promptID).then(messages => {
        setMessages(messages);
      });
      db_operations.getLikedMessages(username).then(likedMessages => {
        setLikedResponseIDs(likedMessages)
      });
    });
  }, []);

  const getCompareFunc = (sortType) => {
    if (sortType === SORTBYTOP) {
      return (message_a, message_b) => {
        if (message_a.likeCount > message_b.likeCount) {
          return 1
        } else if (message_a.likeCount < message_b.likeCount) {
          return -1
        } else {
          return 0
        }
      }
    } else if (sortType === SORTBYNEW) {
      return (message_a, message_b) => {
        if (message_a.timestamp > message_b.timestamp) {
          return 1
        } else if (message_a.timestamp < message_b.timestamp) {
          return -1
        } else {
          return 0
        }
      }
    } else if (sortType === SORTBYOLD) {
      return (message_a, message_b) => {
        if (message_a.timestamp > message_b.timestamp) {
          return -1
        } else if (message_a.timestamp < message_b.timestamp) {
          return 1
        } else {
          return 0
        }
      }
    }
  }

  const handleSort = async (sortType) => {
    const compare = getCompareFunc(sortType)
    var new_messages = await db_operations.getResponses(promptID)
    console.log(messages)
    new_messages.sort(compare)
    console.log(messages)
    setMessages(new_messages)

  }

  const handleSend = async () => {
    const userID = username;
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

  const handleLike = async (username, posterUsername, promptID, responseID) => {
    console.debug(likedResponseIDs)
    const newLikedResponseIDs = await db_operations.handleLike(username, posterUsername, promptID, responseID)
    console.debug('liked responmes', newLikedResponseIDs)
    setLikedResponseIDs(newLikedResponseIDs);
    db_operations.getResponses(promptID).then(messages => {
      setMessages(messages);
    });
  };
  const handleDislike = async (username, posterUsername, promptID, responseID) => {
    console.debug(likedResponseIDs)
    const newLikedResponseIDs = await db_operations.handleDislike(username, posterUsername, promptID, responseID)
    console.debug('disliked responmes', newLikedResponseIDs)
    setLikedResponseIDs(newLikedResponseIDs);
    db_operations.getResponses(promptID).then(messages => {
      setMessages(messages);
    });
  };

  const handleLongPress = async (username, posterUsername, promptID, responseID) => {
    if ([username, posterUsername, promptID, responseID].includes(undefined)) {
      console.error(`got undefined in handleLongPress: username: ${username}, posterUsername: ${posterUsername}, promptID: ${promptID}, responseID: ${responseID}`)

    }
    console.debug(`handlelongpress: ${username}, posterUsername: ${posterUsername}, promptID: ${promptID}, responseID: ${responseID}`)
    if (likedResponseIDs.includes(responseID)) {
      await handleDislike(username, posterUsername, promptID, responseID)
    } else {
      await handleLike(username, posterUsername, promptID, responseID)
    }
  }

  const handleReply = (responseText, responseID, userID) => {
    if ([responseText, responseID, userID].includes(undefined)) {
      console.error("got undefined in handleReply")
    }
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

  const getLikes = async (responseID) => {
    return await db_operations.getLikes(promptID, responseID)
  }

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoChalk}
            source={require('../assets/images/chalk_logo.png')}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.qotd}>Question of the Day: </Text>
          <Text style={styles.logo}>{promptText}</Text>
        </View>
        <View style={styles.rank}>
          <View style={styles.rankRocket}>
            <Image
              style={styles.rocket}
              source={require('../assets/icons/rocket_icon.png')}
            />
          </View>
          <View style={styles.rankStack}>
            <Image
              style={styles.stack}
              source={require('../assets/icons/stackview_icon.png')} git
            />
          </View>
        </View>
        <Button onPress={
          () => handleSort(SORTBYNEW)
        } title="Top" />
        <Button onPress={
          () => handleSort(SORTBYOLD)
        } title="New" />
        <Button onPress={
          () => handleSort(SORTBYTOP)
        } title="Old" />
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
                    handleLongPress(username, message.userID, promptID, message.responseID)
                  }
                  }
                  onPress={() => {
                    handleReply(message.text, message.responseID, message.userID)
                  }
                  }>
                  <Text style={styles.username} onPress={
                    () => {
                      navigation.navigate('Profile', {
                        username: message.userID,
                      });
                    }
                  }>{message.userID}</Text>
                  <Text style={styles.messageText}>{message.text}</Text>
                  <Text style={styles.likeCountText}>Likes: {message.likeCount}</Text>
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
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 70,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  logoContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  logoChalk: {
    width: 250,
    height: 80,
    resizeMode: 'contain',
  },
  qotd: {
    fontWeight: 'bold',
    fontSize: 30,
    color: theme.createCommentColors.sixth,
  },
  logo: {
    fontStyle: 'italic',
    fontFamily: 'Helvetica',
    fontSize: 15,
    marginTop: 7,
  },
  rank: {

  },
  rankRocket: {

  },
  rankStack: {

  },
  stack: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  rocket: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
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
    backgroundColor: '#ADD8E6',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  likeCountText: {
    color: 'black',
    fontWeight: 'bold',
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
    marginBottom: 15,
    fontSize: 16,

  },
});

export default MessageBoard;
