import Location from "../../helpers/location"
import { useFirestoreId } from "../../helpers/useFirestore"
import MessageBar from "../../components/common/MessageBar"
import Messages from "../../components/common/Messages"

const Group = () => {

    const id = Location()[3]

    const groups = useFirestoreId('groups', id)

  return (
    <div className='page-container'>
        {groups && groups.map(group => (
            <>
            <div className='page-top-container'>
                <h1>{group.name}</h1>
            </div>
            <div className='group-container'>
                <Messages id={id}/>
                <div className='messagebar-group-container'>
                    <MessageBar item='group' id={group.id} />
                </div>
            </div>
            </>
        ))}
        
    </div>
  )
}

export default Group