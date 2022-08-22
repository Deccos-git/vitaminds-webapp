import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import uuid from 'react-uuid';
import ButtonClicked from '../../hooks/ButtonClicked'
import { Auth } from '../../state/Auth';
import { useContext, useState } from 'react';
import { db } from '../../libs/firebase'
import Location from "../../helpers/location"
import notifcation from './Notifcation';

const MessageBar = ({item, reciever, id,}) => {
    const [user] = useContext(Auth)

    const [message, setMessage] = useState('')

    const url = `${Location()[2]}/${Location()[3]}`

    const messageHandler = (e) => {

        const value = e.target.value 

        setMessage(value)
    }

    const saveMessage = async (e) => {

        ButtonClicked(e, 'Verstuurd')

        await setDoc(doc(db, "messages", uuid()), {
            message: message,
            user: user.id,
            id: uuid(),
            timestamp: serverTimestamp(),
            type: item,
            itemId: id,
            url: url,
            reciever: reciever ? reciever : ''
          })

          notifcation(id, reciever, user.id, 'Reaction')

    }

  return (
    <div className='messagebar-container'>
        <button>+</button>
        <input type="text" placeholder='Schrijf hier een bericht' onChange={messageHandler} />
        <button onClick={saveMessage}>Verstuur</button>
    </div>
  )
}

export default MessageBar