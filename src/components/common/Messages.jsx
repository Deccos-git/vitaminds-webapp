import { useFirestoreMessage, useFirestoreId } from "../../helpers/useFirestore"
import timestampOptions from '../../helpers/timestampOptions'
import MessageBar from "../../components/common/MessageBar"
import { useState } from "react"
import NestedMessages from "../../components/common/Messages"

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

  return (
    <>
        {messages && messages.map(message => (
            <div className='message-outer-container'>
                
                    <div className='message-container'>
                        <MessageMeta message={message} />
                        <p className='message-content'>{message.message}</p>
                        <div className='interaction-container'>
                            <p onClick={toggleMessageBar}>Reageer</p>
                        </div>
                        <div style={{display: showMessageBar}}>
                            <MessageBar item='reaction' id={message.id} parent={message.id} />
                        </div>
                        <NestedMessages id={message.id} />
                    </div>
            </div>
        ))}
    </>
  )
}

export default Messages