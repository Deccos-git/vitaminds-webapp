import { useFirestoreMessage, useFirestoreId } from "../../helpers/useFirestore"
import timestampOptions from '../../helpers/timestampOptions'
import MessageBar from "../../components/common/MessageBar"
import { useState } from "react"
import NestedMessages from "../../components/common/Messages"
import Likes from "./Likes"
import OptionsIcon from '../../assets/icons/options-icon.png'
import EditIcon from '../../assets/icons/edit-icon.png'
import DeleteIcon from '../../assets/icons/delete-icon.png'

const Messages = ({id}) => {
    const [showMessageBar, setShowMessageBar] = useState('none')

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

    const toggleMessageBar = () => {

        showMessageBar === 'none' ? setShowMessageBar('flex') : setShowMessageBar('none')
    }

    const editMessage = (e) => {}

    const deleteMessage = (e) => {}


  return (
    <>
        {messages && messages.map(message => (
            <div className='message-outer-container'>
                
                    <div className='message-container'>
                        <MessageMeta message={message} />
                        <p className='message-content'>{message.message}</p>
                        <div className='interaction-container'>
                            <p onClick={toggleMessageBar}>Reageer</p>
                            <Likes message={message} />
                            <div className='author-options-container'>
                                <img src={OptionsIcon} alt="options icon" />
                                <div className='dropdown-container'>
                                    <div className='dropdown-icon-container' onClick={editMessage}>
                                        <img src={EditIcon} alt="edit-icon" />
                                        <p>Edit</p>
                                    </div>
                                    <div className='dropdown-icon-container' onClick={deleteMessage}>
                                        <img src={DeleteIcon} alt="delete-icon" />
                                        <p>Eelete</p>
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