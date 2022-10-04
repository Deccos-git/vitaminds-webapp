import Location from "../../helpers/location"
import { useFirestoreId, useFirestoreMemberships } from "../../helpers/useFirestore"
import MessageBar from "../../components/common/MessageBar"
import Messages from "../../components/common/Messages"
import { Auth } from '../../state/Auth';
import { useContext, useState, useEffect } from 'react';
import ActivityIcon from '../../assets/icons/activity-icon.png'
import GroupIcon from '../../assets/icons/group-icon.png'
import ButtonClicked from "../../hooks/ButtonClicked";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../libs/firebase'
import uuid from 'react-uuid';

const Group = () => {
    const [auth] = useContext(Auth)
    const [showRegister, setShowRegister] = useState('flex')
    const [showGroup, setShowGroup] = useState('none')

    const id = Location()[3]

    const groups = useFirestoreId('groups', id)
    const members = useFirestoreMemberships('group', id, auth.id)

    const isMember = () => {
        if(members.length > 0){
            setShowRegister('none')
            setShowGroup('block')
        }
    }

    useEffect(() => {

        isMember()

    },[members])

    const Register = ({group}) => {

        const saveMember = async (e) => {

            ButtonClicked(e, 'Aangemeld')

            await setDoc(doc(db, 'memberships', uuid()),{
                user: auth.id,
                timestamp: serverTimestamp(),
                type: 'group',
                group: group.id,
                id: uuid(),
              })

            setShowRegister('none')
            setShowGroup('block')

        }

        return(
            <div className='group-register-container' style={{display: showRegister}}>
                <div className='page-top-container'>
                    <h1>{group.name}</h1>
                </div>
                <div className='group-description-container'>
                    <div className='group-description-item-container'>
                        <img src={GroupIcon} alt="group icon" />
                        <p>Aantal leden:</p>
                        {/* <p>{group.members.length}</p> */}
                    </div>
                    <div className='group-description-item-container'>
                        <img src={ActivityIcon} alt="active icon" />
                        <p>Laatst actief:</p>
                        <p>{group.lastActive}</p>
                    </div>
                    
                </div>
                <button onClick={saveMember}>Lid worden</button>
            </div>
        )
    }

    const Group = ({group}) => {

        return(
            <div style={{display: showGroup}}>
                <div className='page-top-container'>
                    <h1>{group.name}</h1>
                </div>
                <div className='group-container'>
                    <Messages id={id}/>
                    <div className='messagebar-group-container'>
                        <MessageBar item='group' id={group.id} />
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className='page-container'>
        {groups && groups.map(group => (
            <div key={group.id}>
                <Register group={group}/>
                <Group group={group} />
            </div>
        ))}
        
    </div>
  )
}

export default Group