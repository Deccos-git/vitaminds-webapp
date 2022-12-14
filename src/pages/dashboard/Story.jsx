import { useFirestoreId } from "../../helpers/useFirestore"
import timestampOptions from '../../helpers/timestampOptions'
import Location from "../../helpers/location"
import DummyAvatar from '../../assets/dummy-profile-photo.jpeg'
import MessageBar from "../../components/common/MessageBar"
import Messages from "../../components/common/Messages"

const Story = () => {

    const id = Location()[3]

    const stories = useFirestoreId('stories', id)

    const User = ({story}) => {

        const users = useFirestoreId('users', story.user)

        const ShowUser = ({user}) => {
            if(story.public === 'public'){
                return(
                    <div key={user.id} className='user-meta-container'>
                        <img src={user.avatar} alt="user avatar" />
                        <p>{user.name}</p>
                    </div>
                )
            } else {
                return(
                    <div key={user.id} className='user-meta-container'>
                        <img src={DummyAvatar} alt="dummy avatar" />
                        <p>Anoniem</p>
                    </div>
                )
            }
        }

        return(
            <div className='story-meta-container' >
                {users && users.map(user => (
                    <ShowUser key={user.id} user={user}/>
                ))}
                <p>{story.timestamp.toDate().toLocaleDateString("nl-NL", timestampOptions())}</p>
            </div>
        )
    }
  return (
    <div className='page-container'>
        {stories && stories.map(story => (
            <div key={story.id} className='story-container'>
                <div className='page-top-container'>
                    <img className='story-banner' src={story.banner} alt="article banner" />
                    <h1>{story.title}</h1>
                    <User story={story}/>
                </div>
                <div className='story-body-container'>
                    <p dangerouslySetInnerHTML={{__html: story.body}}></p>
                </div>
                <div className='story-messages-container'>
                    <h2>Berichten</h2>
                    <Messages id={id}/>
                    <div className='messagebar-story-container'>
                        <MessageBar item='story' id={story.id} />
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Story