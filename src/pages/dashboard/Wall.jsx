import { useNavigate } from 'react-router'
import { useFirestoreId, useFirestoreOrdered } from '../../helpers/useFirestore'
import { useState, useEffect } from 'react'
import timestampOptions from '../../helpers/timestampOptions'

const Wall = () => {

  const items = useFirestoreOrdered('wall', 'asc') 

  const WallTitle = ({item}) => {
    const [type, setType] = useState('')

    const navigateTo = useNavigate()

    const users = useFirestoreId('users', item.user)

    const itemType = () => {

      if(item.type === 'story'){
        setType('ervaringsverhaal')
      }
    }

    useEffect(() => {
      itemType()
    }, [item])

    return(
      <>
        {users && users.map(user => (
          <>
            <div className='card-user-container'>
              <img src={user.avatar} alt="user avatar" />
              <p><b>{user.name}</b></p>
            </div>
            <p>heeft een nieuw {type} toegevoegd</p>
            <p>{item.timestamp.toDate().toLocaleDateString("nl-NL", timestampOptions())}</p>
            <button onClick={() => navigateTo(`dashboard/story/${item.storyId}`)}>Bekijk</button>
          </>
         
        ))}
      </>
    )
  }
  return (
    <div className='page-container'>
      <h1>Activiteit</h1>
      <div className='banner-container'>
        {items && items.map(item => (
          <div className='banner' key={item.id}>
              <WallTitle item={item}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wall