import Location from "../../helpers/location"
import { useFirestoreId, useFirestoreMemberships } from "../../helpers/useFirestore"
import MessageBar from "../../components/common/MessageBar"
import Messages from "../../components/common/Messages"
import { Auth } from '../../state/Auth';
import { useContext, useState, useEffect } from 'react';

const Chat = () => {
    const [auth] = useContext(Auth)

    const [showChat, setShowChat] = useState('none')
    const id = Location()[3]
    const users = id.split('_') 

    const chats = useFirestoreId('chats', id) 

    const userOne = useFirestoreId('users', users[0])
    const userTwo = useFirestoreId('users', users[1])

    // Set chat security
    useEffect(() => {
        
        if(users.includes(auth.id)){
            setShowChat('block')
        }
    },[chats])

    
    

  return (
    <div className='page-container'>
        {chats && chats.map(chat => (
            <div key={chat.id}>
                <div style={{display: showChat}}>
                    <div className='page-top-container'>
                        <div className='chat-title-container'>
                            <h1>Chat van</h1>
                            <div className='chat-names-container'>
                                {userOne && userOne.map(user => (
                                    <h1>{user.name}</h1>
                                ))}
                                <h1>&</h1>
                                {userTwo && userTwo.map(user => (
                                    <h1>{user.name}</h1>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='group-container'>
                        <Messages id={id}/>
                        <div className='messagebar-group-container'>
                            <MessageBar item='group' id={chat.id} />
                        </div>
                    </div>
                </div>
            </div>
        ))}
        
    </div>
  )
}

export default Chat