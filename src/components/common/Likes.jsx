import LikeIcon from '../../assets/icons/heart-icon.png'
import uuid from 'react-uuid';
import { db } from '../../libs/firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import { useFirestoreLikes } from "../../helpers/useFirestore"
import notifcation from './Notifcation';

const Likes = ({message}) => {
    const [auth] = useContext(Auth)

    const allLikes = useFirestoreLikes(message.id)

    const likeHandler = (e) => {
        const id = e.target.dataset.messageid 
        const user = e.target.dataset.user

        saveLike(id, user)

    }

    const saveLike = async (id, user) => {

        await setDoc(doc(db, "likes", uuid()), {
            message: id,
            timestamp: serverTimestamp(),
            reciever: user,
            sender: auth.id
          })

          notifcation(id, user, auth.id, 'Like')
    }

    return(
        <div className='likes-container'>
            <img src={LikeIcon} alt="like icon" data-messageid={message.id} data-user={message.user} onClick={likeHandler} />
            <p>{allLikes.length}</p>
        </div>
        
    )
}

export default Likes