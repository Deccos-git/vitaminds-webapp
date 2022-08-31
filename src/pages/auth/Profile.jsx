import Location from "../../helpers/location"
import { useFirestoreId } from "../../helpers/useFirestore"
import timestampOptions from '../../helpers/timestampOptions'
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '../../libs/firebase'
import { useNavigate } from 'react-router'
import uuid from 'react-uuid';

const Profile = () => {
    const [auth] = useContext(Auth)

    const id = Location()[3]
    const navigateTo = useNavigate()

    const users = useFirestoreId('users', id)

    const room = auth.id < id ? auth.id+'_'+id : id+'_'+auth.id

    const chats = useFirestoreId('chats', room)

    console.log(chats.length)

    const startChat = async (e) => {

        if(chats.length === 0){

            await setDoc(doc(db, "chats", uuid()), {
                id: room,
                lastActive: serverTimestamp(),
                timestamp: serverTimestamp(),
                users: room.split('_')
              })

              navigateTo(`/dashboard/chat/${room}`)

        } else if(chats.length > 0){
            navigateTo(`/dashboard/chat/${room}`)
        }
    }

  return (
    <div className='page-container'>
        {users && users.map(user => (
            <div key={user.id} className='story-container'>
                <div className='page-top-container'>
                    <h1>{user.name}</h1>
                </div>
                <img className='profile-avatar' src={user.avatar} alt="" />
                <div className='register-date-container'>
                    <p>Lid sinds</p>
                    <p>{user.timestamp.toDate().toLocaleDateString("nl-NL", timestampOptions())}</p>
                </div>
                <div className='button-container'>
                    <button data-id={user.id} onClick={startChat}>Chat</button>
                </div>
            </div>
        )) }
    </div>
  )
}

export default Profile