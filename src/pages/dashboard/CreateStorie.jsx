import TinyMCE from '../../components/common/TinyMCE'
import { useState } from 'react'
import { db } from '../../libs/firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import uuid from 'react-uuid';
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import ButtonClicked from '../../hooks/ButtonClicked'
import saveFile from '../../components/core/saveFile';
import { useNavigate } from "react-router-dom";

const CreateStorie = () => {
    const [user] = useContext(Auth)

    const [body, setBody] = useState("")
    const [title, setTitle] = useState(null)
    const [banner, setBanner] = useState(null)
    const [publicAnonymously, setPublicAnonymously] = useState(true)

    const navigate = useNavigate()

    const titleHandler = (e) => {

        const value = e.target.value 

        setTitle(value)

    }

    const bannerHandler = (e) => {
        saveFile(e.target.files, setBanner)
    }

    const publicAnonymouslyHandler =(e) => {
        const value = e.target.value  

        setPublicAnonymously(value)
    }

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

        await setDoc(doc(db, 'search', uuid()),{
            user: user.id,
            timestamp: serverTimestamp(),
            type: 'story',
            id: uuid(),
            itemId: storyId,
            content: title,
            url: `story/${storyId}`
        })

        navigate(`/dashboard/stories`)

    }

    return (
        <div className='page-container'>
             <div className='page-top-container'>
                <h1>Deel je ervaringsverhaal</h1>
            </div>
            <div id='create-story-title-container'>
                <h2>Geef je verhaal een titel</h2>
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