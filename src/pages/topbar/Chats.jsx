import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import { useFirestoreChats, useFirestoreId, useFirestoreMemberships } from "../../helpers/useFirestore"
import { useNavigate } from 'react-router'

const Chats = () => {
  const [auth] = useContext(Auth)

  const chats = useFirestoreChats(auth.id) 
  const groupsMemberships = useFirestoreMemberships('type', 'group',  auth.id)

  const navigateTo = useNavigate()

  const ChatTitle = ({item}) => {

    const userOne = useFirestoreId('users', item.users[0])
    const userTwo = useFirestoreId('users', item.users[1])

    return(
      <div className='chat-title-container'>
          <p><b>Chat</b> van</p>
          <div className='chat-names-container'>
              {userOne && userOne.map(user => (
                  <p>{user.name}</p>
              ))}
              <p>&</p>
              {userTwo && userTwo.map(user => (
                  <p>{user.name}</p>
              ))}
          </div>
      </div>
    )
  }

  const GroupTitle = ({item}) => {

    const groups = useFirestoreId('groups', item.group)



    return(
      <div className='group-title-container'>
          <p><b>Groep</b></p>
          <div className='group-names-container'>
              {groups && groups.map(item => (
                <>
                  <p>{item.name}</p>
                  <button onClick={() => navigateTo(`/dashboard/group/${item.id}`)}>Bekijk</button>
                </>
            ))}
          </div>
      </div>
    )
  }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
              <h1>Chats</h1>
          </div>
          <div className='chats-container'>
            <h2 style={{display: chats.length > 0 ? 'block' : 'none'}}>Chats</h2>
            {chats && chats.map(item => (
              <div key={item.id} className='chats-item-container'>
                <ChatTitle item={item}/>
                <button onClick={() => navigateTo(`/dashboard/chat/${item.id}`)}>Bekijk</button>
              </div>
            ))}
            <h2 style={{display: groupsMemberships.length > 0 ? 'block' : 'none'}}>Groepen</h2>
            {groupsMemberships && groupsMemberships.map(item => (
              <div key={item.id} className='chats-item-container'>
                <GroupTitle item={item}/>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Chats