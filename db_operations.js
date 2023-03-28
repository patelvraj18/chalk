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
    karma: 0,
    likedResponses: [],
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
            likeCount: obj.likeCount,
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

function getComments(responseID) {
  const dbRef = ref(db);
  return get(child(dbRef, `comments/${responseID}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return Promise.resolve(
          Object.values(snapshot.val()).map(obj => ({
            text: obj.text,
            userID: obj.userID,
            commentID: obj.commentID,
            likeCount: obj.likeCount,
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
    likeCount: 0,
  });
  const responseID = newResponse.key;
  update(newResponse, {responseID: responseID});
  return responseID;
}

function replyToResponse(userID, text, responseID) {
  //add commentID to comment responses
  //add comment to comments
  const commentRef = ref(db, `comments/${responseID}`);
  const newComment = push(commentRef, {
    text: text,
    userID: userID,
    likeCount: 0,
  });
  const commentID = newComment.key;
  update(newComment, {commentID: commentID});
}

function getComment(promptID, responseID) {
  const commentRef = ref(db, `responses/${promptID}/${responseID}`);
  return get(commentRef).then(snapshot => {
      if (snapshot.exists()) {
        return Promise.resolve(snapshot.val())
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
const getLikes = async (promptID, responseID) => {
  commentObj = await getComment(promptID, responseID)
  return commentObj.likeCount
}
const incrementLike = async (promptID, responseID) => {
  commentObj = await getComment(promptID, responseID)
  commentRef = ref(db, `responses/${promptID}/${responseID}`)
  update(commentRef, {likeCount: commentObj.likeCount + 1})
}

const decrementLike = async (promptID, responseID) => {
  commentObj = await getComment(promptID, responseID)
  commentRef = ref(db, `responses/${promptID}/${responseID}`)
  update(commentRef, {likeCount: commentObj.likeCount - 1})
}
const handleLike = async (username, promptID, responseID) => {
  userObj = await getUser(username)
  if (!userObj.hasOwnProperty('likedResponses')) {
    userObj.likedResponses = []
  }
  console.log('before pushing response ID in handleLike')
  userObj.likedResponses.push(responseID)
  userRef = ref(db, `users/${userObj.userId}`)
  update(userRef, userObj);
  console.log('Db op liked responmes', userObj.likedResponses)
  return userObj.likedResponses
}
const handleDislike = async (username, promptID, responseID) => {
  userObj = await getUser(username)
  if (!userObj.hasOwnProperty('likedResponses')) {
    userObj.likedResponses = []
  }
  console.log('before removing responseId in handleDislike')
  const index = userObj.likedResponses.indexOf(responseID)
  userObj.likedResponses.splice(index,1)
  console.log(userObj)
  userRef = ref(db, `users/${userObj.userId}`)
  update(userRef, userObj);
  console.log('Db op disliked responmes', userObj.likedResponses)
  return userObj.likedResponses

}
const getLikedMessages= async (username) => {
  const userObj = await getUser(username);
  if (!userObj.hasOwnProperty('likedResponses')) {
    userObj.likedResponses = []
  }
  return userObj.likedResponses;
}
function getUser(username) {
    const dbRef = ref(db);
    return get(child(dbRef, `users`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const users = snapshot.val();
          for (const userId in users) {
            const user = users[userId];
            if (user.username === username) {
              users[userId].userId = userId
              return users[userId];
            }
          }
          console.log(`User with username ${username} not found`);
        } else {
          console.error('No user data available');
        }
      })
      .catch(error => {
        console.error(error);
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
  getComments,
  replyToResponse,
  getComment,
  incrementLike,
  decrementLike,
  handleDislike,
  handleLike,
  getLikedMessages,
  getLikes,
};
