import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import uuid from 'react-uuid';
import ButtonClicked from '../../hooks/ButtonClicked'
import { Auth } from '../../state/Auth';
import { useContext, useState } from 'react';
import { db } from '../../libs/firebase'
import Location from "../../helpers/location"
import notifcation from './Notifcation';
import saveFile from '../../components/core/saveFile';

const MessageBar = ({item, reciever, id, setState}) => {
    const [user] = useContext(Auth)

    const [message, setMessage] = useState('')
    const [showFileUpload, setShowFileUpload] = useState('none')

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

    const toggleFileUpload = () => {

      if(showFileUpload === 'none'){
        setShowFileUpload('block')
      } else{
        setShowFileUpload('none')
      }

    }

    const fileHandler = (e) => {
      saveFile(e.target.files, setMessage)
    }

    console.log(message)

  return (
    <div>
      <div className='messagebar-container'>
          <button onClick={toggleFileUpload}>+</button>
          <input type="text" placeholder='Schrijf hier een bericht' value={message} onChange={messageHandler} />
          <button onClick={saveMessage}>Verstuur</button>
      </div>
      <input id='upload-file-input' type="file" style={{display: showFileUpload}} onChange={fileHandler} />
    </div>
    
  )
}

export default MessageBar