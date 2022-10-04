import { useNavigate } from "react-router-dom"
import { useFirestoreOrdered } from '../../helpers/useFirestore'
import { useFirestoreId } from "../../helpers/useFirestore"
import timestampOptions from '../../helpers/timestampOptions'
import DummyAvatar from '../../assets/dummy-profile-photo.jpeg'

const Stories = () => {

    const navigate = useNavigate()

    const stories = useFirestoreOrdered('stories','desc')

    const showStory = (e) => {

        const id = e.target.dataset.id

        navigate(`/dashboard/story/${id}`)
    }

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
        <div className='page-top-container'>
            <h1>Ervaringsverhalen</h1>
            <button onClick={() => navigate(`/dashboard/createstorie`)}>Deel jouw verhaal</button>
        </div>
        <div className='card-container'>
            {stories && stories.map(story => (
                <div className='card' key={story.id}>
                    <img className='card-story-banner' src={story.banner} alt="article banner" />
                    <h2>{story.title}</h2>
                    <User story={story}/>
                    <div className='button-container card-button-container'>
                        <button data-id={story.id} onClick={showStory}>Bekijk</button>
                    </div>
                </div>
            ))}

        </div>
      </div>
    )
  }
  
  export default Stories