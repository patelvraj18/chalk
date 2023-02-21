import database from '@react-native-firebase/database';
import { Text } from 'react-native/types';

const FirebaseTest = () => {
    var text;
database()
  .ref('https://chalk-2c91e-default-rtdb.firebaseio.com/')
  .once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
    text=snapshot.val()
  });

  return(
    <Text>text</Text>
  )
}
export default FirebaseTest