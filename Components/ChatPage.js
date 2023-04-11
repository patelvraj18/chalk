import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { addDoc, collection, orderBy, onSnapshot, query } from 'firebase/firestore';
import { auth, database } from '../src/firebase/config';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { getFirestore } from 'firebase/firestore'


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

export default function ChatPage({ route }) {
  const [message, setMessages] = useState([]);
  const navigation = useNavigation();
  const { username } = route.params;


  useLayoutEffect(() => {
    const collectionMessage = collection(database, 'chat');
    const query = query(collectionMessage, orderBy('createdAt', 'desc'));

    const mess = onSnapshot(q, snapshot => {
      console.log('snapshot')
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc._id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    });
    return () => mess();
  }, []);

  const onSend = useCallback((message = []) => {
    setMessages(previousMessages => GiftedChat.appened(previousMessages, message));

    const { _id, createdAt, text, user } = message[0];
    addDoc(collection(database), 'chat'), {
      _id, createdAt, text, user
    };
  }, []);

  return (
    <GiftedChat
      messages={message}
      onSend={messages => onSend(message)}
      user={{
        _id: username,
        avatar: 'https://i.pravatar.cc/300'


      }}
      messagesContainerStyle={styles.messagesContainer}
    />
  )
}

const styles = StyleSheet.create({
  messagesContainerStyle: {
    backgroundColor: 'white',
  },
});


// const ChatPage = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   const sendMessage = () => {
//     setMessages([...messages, message]);
//     setMessage('');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.messageContainer}>
//         <FlatList
//           data={messages}
//           renderItem={({ item }) => (
//             <View style={styles.messageItem}>
//               <Text style={styles.messageText}>{item}</Text>
//             </View>
//           )}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type your message here"
//           placeholderTextColor="#bbb"
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   messageContainer: {
//     flex: 1,
//     paddingTop: 20,
//     paddingHorizontal: 10,
//   },
//   messageItem: {
//     paddingVertical: 10,
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 20,
//     paddingHorizontal: 20,
//     fontSize: 16,
//     marginRight: 10,
//   },
//   sendButton: {
//     width: 80,
//     height: 40,
//     backgroundColor: '#3f51b5',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default ChatPage;