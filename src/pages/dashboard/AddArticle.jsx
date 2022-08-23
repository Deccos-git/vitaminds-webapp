import Location from "../../helpers/location"
import uuid from 'react-uuid';
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import ButtonClicked from '../../hooks/ButtonClicked'
import TinyMCE from '../../components/common/TinyMCE'
import { useState } from 'react'
import { db } from '../../libs/firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import saveFile from '../../components/core/saveFile';

const AddArticle = () => {
    const [user] = useContext(Auth)

    const [body, setBody] = useState("")
    const [title, setTitle] = useState(null)
    const [banner, setBanner] = useState(null)

    const id = Location()[3]
    const navigate = useNavigate()

    const titleHandler = (e) => {

        const value = e.target.value 

        setTitle(value)

    }

    const bannerHandler = (e) => {
        saveFile(e, setBanner)
    }

    const saveStory = async (e) => {

        ButtonClicked(e, 'Gedeeld')

        const storyId = uuid()

        await setDoc(doc(db, "articles", uuid()), {
            title: title,
            body: body,
            banner: banner,
            user: user.id,
            id: storyId,
            academy: id,
            timestamp: serverTimestamp(),
          })

          navigate(`/dashboard/academy/${id}`)

    }


  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <h1>Artikel toevoegen</h1>
        </div>
        <div id='create-story-title-container'>
                <h2>Geef je artikel een titel</h2>
                <input type="text" placeholder='Schrijf hier de titel' onChange={titleHandler} />
            </div>
            <div id='create-story-title-container'>
                <h2>Schrijf je artikel</h2>
                <TinyMCE setBody={setBody}/>
            </div>
            <div id='create-story-title-container'>
                <h2>Upload een banner</h2>
                <p>Voeg een mooi plaatje toe voor bovenaan je verhaal</p>
                {banner && <img src={banner} alt="story banner" />}
                <input type="file" accept="image/png, image/jpeg" onChange={bannerHandler} />
            </div>
            <div className='button-container'>
                <button onClick={saveStory}>Delen</button>
            </div>
    </div>
  )
}

export default AddArticle