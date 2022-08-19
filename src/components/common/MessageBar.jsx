import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import uuid from 'react-uuid';
import ButtonClicked from '../../hooks/ButtonClicked'
import { Auth } from '../../state/Auth';
import { useContext, useState } from 'react';
import { db } from '../../libs/firebase'

const MessageBar = ({item, id, parent}) => {
    const [user] = useContext(Auth)

    const [message, setMessage] = useState('')

    const messaegHandler = (e) => {

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
            itemId: id
          })

    }

  return (
    <div className='messagebar-container'>
        <button>+</button>
        <input type="text" placeholder='Schrijf hier een bericht' onChange={messaegHandler} />
        <button onClick={saveMessage}>Verstuur</button>
    </div>
  )
}

export default MessageBar