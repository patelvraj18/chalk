import {getDatabase, ref, push, set, child, get} from 'firebase/database';
import {app} from './src/firebase/config';
/* 
page loads
fetch comments (query db based on the date)
for each comment:
    fetch responses


(in background, chcek for realtime updates if anyone has written a comment)
 -- check for database changes
    
when user presses submit comment button (this is for you ben)
triggers function that writes comment (pushes comment to database)

methods:
PUSH:
write comment
respond to comment (grab commentID)

FETCH:
fetch comments
fetch responses to coment 

(this needs to be called on every comment and then every subsequent response found)

const prompt = ref(db, 'prompts/' + promptID);


*/
const db = getDatabase(app);

function setPrompt(text) {
  promptID = getPromptID();
  date = Date.now();
  push(ref(db, 'prompt/prompts'), {
    text: text,
    promptID: promptID,
    date: date,
  });
}

function setUsername(username, userCredential) {
  const user = userCredential.user;
  set(ref(db, `users/${user.uid}`), {
    username: username,
    email: user.email,
  });
}

function getUsername(email) {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db);
    get(child(dbRef, `users`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const users = snapshot.val();
          for (const userId in users) {
            const user = users[userId];
            if (user.email === email) {
              resolve(user.username);
            }
          }
          reject('User with email not found');
        } else {
          reject('No user data available');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getPrompt() {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db);
    get(child(dbRef, 'prompt/prompts'))
      .then(snapshot => {
        if (snapshot.exists()) {
          const latestPrompt = Object.values(snapshot.val()).reduce(function (
            prev,
            curr,
          ) {
            return prev.date > curr.date ? prev : curr;
          });
          resolve(latestPrompt.text);
        } else {
          reject('No prompt data available');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getMessages() {
  const dbRef = ref(db);
  return get(child(dbRef, `comments/1`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return Promise.resolve(
          Object.values(snapshot.val()).map(obj => ({
            text: obj.text,
            userID: obj.userID,
          })),
        );
      } else {
        console.log('No data available');
        return Promise.resolve([]);
      }
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}

function getPromptID() {
  //get list of prompts
  //filter through prompts for most recent one
  //get prompt id
  //return

  return 1;
}

function respondToPrompt(userID, text, commentID) {
  //add commentID to prompt responses
  //add comment to comments
  promptID = getPromptID();
  const comments_list = ref(db, 'comments/' + promptID);
  const new_comment = push(comments_list);
  push(comments_list, {
    text: text,
    commentID: commentID,
    userID: userID,
    responses: [],
  });

  const prompt_responses = ref(db, 'prompt/responses');
  push(prompt_responses, {
    commentID: commentID,
  });
}

function respondToComment(responseID, userID, text, commentID) {
  //add commentID to comment responses
  //add comment to comments
  push(ref(db, 'comments/' + commentID), {
    text: text,
    commentID: commentID,
    userID: userID,
  });
}

/* real-time listening 
const commentRef = ref(db, 'prompts/' + promptID + '/starCount');
onValue(commentRef, (snapshot) => {
  const data = snapshot.val();
  updateComments(postElement, data);
});
*/
export {
  setUsername,
  getUsername,
  setPrompt,
  respondToPrompt,
  getPrompt,
  getMessages,
};
