import React from 'react'
import TinyMCE from '../../components/common/TinyMCE'
import { useState } from 'react'
import { db } from '../../libs/firebase'
import { doc, setDoc } from "firebase/firestore"; 
import uuid from 'react-uuid';
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import ButtonClicked from '../../hooks/ButtonClicked'

const CreateStorie = () => {
    const [user] = useContext(Auth)

    const [body, setBody] = useState("")
    const [title, setTitle] = useState(null)

    const titleHandler = (e) => {

        const value = e.target.value 

        setTitle(value)

    }

    const saveStory = async (e) => {

        ButtonClicked(e, 'Gedeeld')

        await setDoc(doc(db, "stories", uuid()), {
            title: title,
            body: body,
            user: user.id,
            id: uuid()
          })

    }

    return (
        <div className='page-container'>
            <h1>Deel een ervaringsverhaal</h1>
            <div id='create-story-title-container'>
                <h2>Geej je verhaal een titel</h2>
                <input type="text" placeholder='Schrijf hier de titel' onChange={titleHandler} />
            </div>
            <div id='create-story-title-container'>
                <h2>Schrijf je verhaal</h2>
                <TinyMCE setBody={setBody}/>
            </div>
            <div className='button-container'>
                <button onClick={saveStory}>Delen</button>
            </div>
        </div>
    )
}

export default CreateStorie