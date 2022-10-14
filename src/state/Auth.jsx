import { createContext, useState, useEffect } from "react";
import { db } from '../libs/firebase'
import { collection, query, where, getDocs} from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Auth = createContext()

export const AuthProvider = (props) => {

    const [authO, setAuthO] = useState("")
    const [email, setEmail] = useState('')

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const email = user.email;

            setEmail(email)

        } else {
        return
        }
    });

    useEffect(() => {

        const userQuery = async () => {

            const col = collection(db, 'users');
            const q = query(col, where('email', '==', email));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                setAuthO({...doc.data(), docid: doc.id})
            );

        }

        userQuery()
        
    },[email])


    return(
        <Auth.Provider value={[authO]}>
            {props.children}
        </Auth.Provider>
    )
}