import { useFirestoreId } from "../../helpers/useFirestore"
import timestampOptions from '../../helpers/timestampOptions'
import Location from "../../helpers/location"
import MessageBar from "../../components/common/MessageBar"
import Messages from "../../components/common/Messages"

const Article = () => {

    const id = Location()[3]

    const articles = useFirestoreId('articles', id)

    const User = ({item}) => {

        const users = useFirestoreId('users', item.user)

        return(
            <div className='story-meta-container' >
                {users && users.map(user => (
                    <div key={user.id} className='user-meta-container'>
                        <img src={user.avatar} alt="user avatar" />
                    <p>{user.name}</p>
                </div>
                ))}
                <p>{item.timestamp.toDate().toLocaleDateString("nl-NL", timestampOptions())}</p>
            </div>
        )
    }
  return (
    <div className='page-container'>
        {articles && articles.map(item => (
            <div key={item.id} className='story-container'>
                <div className='page-top-container'>
                    <h1>{item.title}</h1>
                    <User item={item}/>
                </div>
                <div className='story-body-container'>
                    <p dangerouslySetInnerHTML={{__html: item.body}}></p>
                </div>
                <h2>Berichten</h2>
                <Messages id={id}/>
                <div className='messagebar-story-container'>
                    <MessageBar item='story' id={item.id} />
                </div>
            </div>
        ))}
    </div>
  )
}

export default Article