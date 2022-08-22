import Location from "../../helpers/location"
import { useFirestoreId, useFirestoreNotifications } from '../../helpers/useFirestore'
import { useNavigate } from "react-router-dom"
import timestampOptions from '../../helpers/timestampOptions'

const Notifications = () => {

    const id = Location()[3]
    const navigate = useNavigate()

    const notifications = useFirestoreNotifications(id) 

    const NotificationItem = ({notification}) => {

        const messages = useFirestoreId('messages', notification.source)

        const Message = () => { 

            return(
                <>
                    {messages && messages.map(message => (
                        <p key={message.id}><i>{message.message}</i></p>
                    ))}
                </>
            )
        }

        const Sender = () => {

            const users = useFirestoreId('users', notification.sender)

            return(
                <>
                    {users && users.map(user => (
                        <div key={user.id} className='notifications-user-container' onClick={() => navigate(`/dashboard/profile/${user.id}`)}>
                            <img src={user.avatar} alt="user avatar" />
                            <p>{user.name}</p>
                        </div>
                    ))}
                </>
            )
        }

        const Type = () => {

            const type = notification.type 

            if(type === 'Like'){
                return(
                    <p>heeft jouw bericht <Message/> geliked</p>
                )
            }

            if(type === 'Reaction'){
                return(
                    <p>heeft op jouw bericht <Message/> gereageerd</p>
                )
            }
        }

        const Button = () => {

            return(
                <>
                    {messages && messages.map(message => (
                        <button key={message.id} onClick={() => navigate(`/dashboard/${message.url}`)}>Bekijk</button>
                    ))}
                </>
            )
        }


        return(
            <>
                <Sender/>
                <Type/>
                <p>{notification.timestamp.toDate().toLocaleDateString("nl-NL", timestampOptions())}</p>
                <Button/>
            </>
        )
    }
  return (
    <div className='page-container'>
        <div className='page-top-container'>
                <h1>Notificaties</h1>
            </div>
        <div className='banner-container'>
            {notifications && notifications.map(item => (
            <div className='banner' key={item.id}>
                <NotificationItem notification={item} />
            </div>
            ))}
        </div>
    </div>
  )
}

export default Notifications