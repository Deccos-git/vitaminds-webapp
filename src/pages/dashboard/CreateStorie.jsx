import React from 'react'
import TinyMCE from '../../components/common/TinyMCE'
import { useState } from 'react'
import { db } from '../../libs/firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import uuid from 'react-uuid';
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import ButtonClicked from '../../hooks/ButtonClicked'
import saveFile from '../../components/core/saveFile';

const CreateStorie = () => {
    const [user] = useContext(Auth)

    const [body, setBody] = useState("")
    const [title, setTitle] = useState(null)
    const [banner, setBanner] = useState(null)
    const [publicAnonymously, setPublicAnonymously] = useState(true)

    const titleHandler = (e) => {

        const value = e.target.value 

        setTitle(value)

    }

    const bannerHandler = (e) => {
        saveFile(e, setBanner)
    }

    const publicAnonymouslyHandler =(e) => {
        const value = e.target.value  

        setPublicAnonymously(value)
    }

    console.log(publicAnonymously)


    const saveStory = async (e) => {

        ButtonClicked(e, 'Gedeeld')

        const storyId = uuid()

        await setDoc(doc(db, "stories", uuid()), {
            title: title,
            body: body,
            banner: banner,
            user: user.id,
            id: storyId,
            timestamp: serverTimestamp(),
            public: publicAnonymously
          })

        await setDoc(doc(db, 'wall', uuid()),{
            user: user.id,
            timestamp: serverTimestamp(),
            type: 'story',
            id: uuid(),
            storyId: storyId
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
            <div id='create-story-title-container'>
                <h2>Upload een banner</h2>
                <p>Voeg een mooi plaatje toe voor bovenaan je verhaal</p>
                {banner && <img src={banner} alt="story banner" />}
                <input type="file" accept="image/png, image/jpeg" onChange={bannerHandler} />
            </div>
            <div id='create-story-title-container'>
                <h2>Openbaar of anoniem</h2>
                <p>Wil je de mensen uit de community laten weten dat jij dit verhaal hebt geschreven of wil je het verhaal anoniem delen?</p>
                <div className='radio-select-container'>
                    <div className='radio-select-detail-container' onChange={publicAnonymouslyHandler}>
                        <input type="radio" id="public" name="public-anonymously" value="public" checked checked={publicAnonymously === "public"} /> <p>Openbaar</p>
                        <input type="radio" id="anonymously" name="public-anonymously" value="anonymously" checked={publicAnonymously === "anonymously"} /> <p>Anoniem</p>
                    </div>
                </div>
            </div>
            <div className='button-container'>
                <button onClick={saveStory}>Delen</button>
            </div>
        </div>
    )
}

export default CreateStorie