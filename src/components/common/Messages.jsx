import { useFirestoreMessage, useFirestoreId } from "../../helpers/useFirestore"
import timestampOptions from '../../helpers/timestampOptions'
import MessageBar from "../../components/common/MessageBar"
import { useState } from "react"
import NestedMessages from "../../components/common/Messages"
import Likes from "./Likes"
import OptionsIcon from '../../assets/icons/options-icon.png'
import EditIcon from '../../assets/icons/edit-icon.png'
import DeleteIcon from '../../assets/icons/delete-icon.png'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../libs/firebase'
import { Auth } from '../../state/Auth';
import { useContext } from 'react';

const Messages = ({id}) => {
    const [auth] = useContext(Auth)

    const [showMessageBar, setShowMessageBar] = useState('none')
    const [showwAuthorOptions, setShowAuthorOptions] = useState('none')
    const [showEditInput, setShowEditInput] = useState('none')
    const [showMessage, setShowMessage] = useState('block')

    const messages = useFirestoreMessage(id)

    const MessageMeta = ({message}) => {

        const users = useFirestoreId('users', message.user)

        return(
            
            <div className='message-meta-container'>
                <>
                {users && users.map(user => (
                    <div key={user.id} className='message-user-meta-container'>
                        <img src={user.avatar} alt="user avatar" />
                        <p>{user.name}</p>
                    </div>
                ))}
                <p className='message-timestamp'>{message.timestamp.toDate().toLocaleDateString("nl-NL", timestampOptions())}</p>
                </>
            </div>
        )
    }

    const Message = ({message}) => {
        const [edit, setEdit] = useState('')

        const editHandler = (e) => {
            const input = e.target.value 

            setEdit(input)
        }

        const saveEdit = async (e) => {

            const docid = message.docid

            await updateDoc(doc(db, 'messages', docid), {
                message: edit
                })

            setShowEditInput('none')
            setShowMessage('block')


        }

        if (message.message === 'deleted by author'){
            return(
                <>
                    <p className='message-content' style={{display: showMessage}}><i>Verwijderd door auteur</i></p>
                    <div className='edit-message-container' style={{display: showEditInput}}>
                        <input type="text" defaultValue='Verwijderd door auteur' onChange={editHandler} />
                        <button onClick={saveEdit} >Opslaan</button>
                    </div>
                </>
            ) 
        } else {
            return(
                <div>
                    <p className='message-content' style={{display: showMessage}}>{message.message}</p>
                    <div className='edit-message-container' style={{display: showEditInput}}>
                        <input type="text" defaultValue={message.message} onChange={editHandler} />
                        <button onClick={saveEdit}>Opslaan</button>
                    </div>
                </div>
            ) 
        }
    }

    const toggleMessageBar = () => {

        showMessageBar === 'none' ? setShowMessageBar('flex') : setShowMessageBar('none')
    }

    const editMessage = async (e) => {

        setShowEditInput('flex')
        setShowAuthorOptions('none')
        setShowMessage('none')
  
    }

    const deleteMessage = async (e) => {

        const docid = e.target.dataset.docid 

        await updateDoc(doc(db, 'messages', docid), {
            message: 'deleted by author'
            })

        setShowAuthorOptions('none')
    }


  return (
    <>
        {messages && messages.map(message => (
            <div key={message.id} className='message-outer-container'>
                    <div className='message-container'>
                        <MessageMeta message={message} />
                        <Message message={message} />
                        <div className='interaction-container'>
                            <p onClick={toggleMessageBar}>Reageer</p>
                            <Likes message={message} />
                            <div className='author-options-container'>
                                <img src={OptionsIcon} alt="options icon" style={{display: message.user === auth.id ? 'block' : 'none'}} onMouseOver={() => setShowAuthorOptions('flex')}  />
                                <div className='dropdown-container' style={{display: showwAuthorOptions}} onMouseLeave={() => setShowAuthorOptions('none')}>
                                    <div className='dropdown-icon-container' onClick={editMessage}>
                                        <img src={EditIcon} alt="edit-icon" />
                                        <p>Edit</p>
                                    </div>
                                    <div className='dropdown-icon-container'>
                                        <img src={DeleteIcon} alt="delete-icon" data-docid={message.docid} onClick={deleteMessage}/>
                                        <p data-docid={message.docid} onClick={deleteMessage}>Delete</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{display: showMessageBar}}>
                            <MessageBar item='reaction' id={message.id} reciever={message.user} parent={message.id} />
                        </div>
                        <NestedMessages id={message.id} />
                    </div>
            </div>
        ))}
    </>
  )
}

export default Messages