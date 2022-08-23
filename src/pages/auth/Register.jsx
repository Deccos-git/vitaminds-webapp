import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../../libs/firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { useState } from "react";
import dummyAvatar from '../../assets/dummy-profile-photo.jpeg'
import ButtonClicked from "../../hooks/ButtonClicked";
import { Link } from 'react-router-dom'
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom"
import { useFirestore } from "../../helpers/useFirestore";

const Register = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [avatar, setAvatar] = useState(dummyAvatar)
    const [academy, setAcademy] = useState(null)
    const [progress, setProgress] = useState(0)

    const navigate = useNavigate()

    const academies = useFirestore('academies')

    const register = (e) => {

        ButtonClicked(e, 'Versturen')

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
        .then( async (userCredential) => {

            const user = userCredential.user;

            const id = uuid()

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                avatar: avatar,
                id: id,
                activated: false,
                academy: academy,
                timestamp: serverTimestamp()
              });

              await setDoc(doc(db, 'wall', uuid()),{
                user: id,
                timestamp: serverTimestamp(),
                type: 'story',
                id: uuid(),
              })

              await setDoc(doc(db, 'memberships', uuid()),{
                user: id,
                timestamp: serverTimestamp(),
                type: 'academy',
                academy: academy,
                id: uuid(),
              })

              navigate(`/login`)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            console.log(errorCode)
        });
    }

    const nameHandler = (e) => {
        const value = e.target.value 

        setName(value)
    }

    const emailHandler = (e) => {
        const value = e.target.value 

        setEmail(value)
    }

    const passwordHandler = (e) => {
        const value = e.target.value 

        setPassword(value)
    }

    const academyHandler = (e) => {

        const option = e.target.options

        const value = option[option.selectedIndex].innerHTML

        setAcademy(value)
    }

    const avatarHandler = (e) => {

        const file = e.target.files[0]

        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress)
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            console.log(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setAvatar(downloadURL)
            });
        }
        );
    }

  return (
    <div className='login-register-container'>
        <h1>Register</h1>
        <p>Naam</p>
        <input type="text" placeholder='Schrijf hier je naam' onChange={nameHandler} />
        <p>Profielfoto</p>
        <img id='register-avatar' src={avatar ? avatar : dummyAvatar} alt="profile picture" />
        <input type="file" onChange={avatarHandler} />
        <p>Herstelacademie</p>
        <select name="" id="" onChange={academyHandler}>
            <option value="">Selecteer je herstelacademie</option>
            {academies && academies.map(item => (
                <option value={item.id}>{item.name}</option>
            ))}
        </select>
        <p>Email</p>
        <input type="text" placeholder='Schrijf hier je email' onChange={emailHandler} />
        <p>Paswoord</p>
        <input type="password" placeholder='Schrijf hier je paswoord' onChange={passwordHandler} />
        <div className='button-container'>
            <button onClick={register}>Registreer</button>
        </div>
        <p>Al een account? 
        <Link to="/login"> Log in</Link>
        </p>
    </div>
  )
}

export default Register