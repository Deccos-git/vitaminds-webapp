import Location from "../../helpers/location"
import uuid from 'react-uuid';
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import ButtonClicked from '../../hooks/ButtonClicked'
import { useState, useEffect } from 'react'
import { db } from '../../libs/firebase'
import { doc, setDoc, serverTimestamp, arrayUnion } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

const AddGroup = () => {
    const [auth] = useContext(Auth)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [guardedOpen, setGuardedOpen] = useState('guarded')

    const id = Location()[3]
    const navigate = useNavigate()

    const nameHandler = (e) => {

        const value = e.target.value 

        setName(value)
    }

    const descriptionHandler = (e) => {
        const value = e.target.value 

        setDescription(value)
    }

    const guardedOpenHandler = (e) => {

        const value = e.target.value

        setGuardedOpen(value)
    }

    const saveGroup = async (e) => {

        ButtonClicked(e, 'Opgeslagen')

        const groupId = uuid()

        await setDoc(doc(db, "groups", uuid()), {
            name: name,
            id: groupId,
            description: description,
            timestamp: serverTimestamp(),
            academy: id,
            secure: guardedOpen
          })
        
        await setDoc(doc(db, 'memberships', uuid()),{
            user: auth.id,
            timestamp: serverTimestamp(),
            type: 'group',
            group: groupId,
            id: uuid(),
          })

          navigate(`/dashboard/group/${id}`)

    }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <h1>Groep toevoegen</h1>
        </div>
        <div>
            <h2>Groepsnaam</h2>
            <input type="text" placeholder='Geef de groep een naam' onChange={nameHandler} />
        </div>
        <div>
            <h2>Omschrijving</h2>
            <textarea name="" id="" cols="30" rows="10" placeholder='Geef de groep een korte omschrijving' onChange={descriptionHandler}></textarea>
        </div>
        <div>
            <h2>Beveiliging</h2>
            <p>Mensen van een beveiligde groep kunnen alleen lid worden als de admin daartoe toestemming geeft.</p>
            <div className='radio-select-container'>
                <div className='radio-select-detail-container' onChange={guardedOpenHandler}>
                    <input type="radio" id="guarded" name="guardedOpen" value="guarded" checked checked={guardedOpen === "guarded"} /> <p>Beveiligd</p>
                    <input type="radio" id="open" name="guardedOpen" value="open" checked={guardedOpen === "open"} /> <p>Niet beveiligd</p>
                </div>
            </div>
        </div>
        <div className='button-container'>
            <button onClick={saveGroup}>Opslaan</button>
        </div>
    </div>
  )
}

export default AddGroup