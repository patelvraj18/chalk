import {getDatabase, ref, push, set, onValue} from 'firebase/database';
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

function getPrompt() {}

function getPromptID() {
  //get list of prompts
  //filter through prompts for most recent one
  //get prompt id
  //return

  return promptID;
}

function respondToPrompt(promptID, userID, text, commentID) {
  //add commentID to prompt responses
  //add comment to comments
  const comments_list = ref(db, 'prompts/' + promptID + 'comments/');
  const new_comment = push(comments_list);
  set(new_comment, {
    text: text,
    commentID: commentID,
    userID: userID,
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
export default respondToPrompt;
