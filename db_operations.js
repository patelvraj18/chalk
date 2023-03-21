import {
  getDatabase,
  ref,
  push,
  set,
  child,
  get,
  update,
} from 'firebase/database';
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
  const promptsRef = ref(db, 'prompt/prompts');
  const newPromptRef = push(promptsRef, {
    text: text,
    date: Date.now(),
    responses: [],
  });
  const promptID = newPromptRef.key;
  update(newPromptRef, {promptID: promptID});
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
          resolve(latestPrompt);
        } else {
          reject('No prompt data available');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getResponses(promptID) {
  const dbRef = ref(db);
  return get(child(dbRef, `responses/${promptID}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return Promise.resolve(
          Object.values(snapshot.val()).map(obj => ({
            text: obj.text,
            userID: obj.userID,
            responseID: obj.responseID,
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

function respondToPrompt(userID, text, promptID) {
  //add commentID to prompt responses
  //add comment to comments
  // promptID = getPromptID();
  // const comments_list = ref(db, 'comments/' + promptID);
  // const new_comment = push(comments_list);
  // push(comments_list, {
  //   text: text,
  //   commentID: commentID,
  //   userID: userID,
  //   responses: [],
  // });

  const responsesRef = ref(db, `responses/${promptID}`);
  const newResponse = push(responsesRef, {
    text: text,
    userID: userID,
    comments: [],
  });
  const responseID = newResponse.key;
  update(newResponse, {responseID: responseID});
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
  getResponses,
};
