import { db } from '../../libs/firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import uuid from 'react-uuid';

const notification = async (source, reciever, sender, type) => {

    await setDoc(doc(db, "notifications", uuid()), {
        source: source,
        timestamp: serverTimestamp(),
        reciever: reciever ? reciever : '',
        sender: sender,
        type: type,
        new: true
      })

}

export default notification