import Location from "../../helpers/location"
import { useFirestoreId } from "../../helpers/useFirestore"
import timestampOptions from '../../helpers/timestampOptions'

const Profile = () => {

    const id = Location()[3]

    const users = useFirestoreId('users', id)

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
            </div>
        )) }
    </div>
  )
}

export default Profile