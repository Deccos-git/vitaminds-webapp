import { db } from "../libs/firebase"
import { useState, useEffect} from 'react';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"; 

const useFirestore = (collect) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, collect);
        const snapshot = await getDocs(col);

        const docArray = []

        snapshot.docs.forEach(doc => 
            docArray.push({...doc.data(), docid: doc.id})
        );

        return docArray

    }

    useEffect(() => {

        getCollection().then(coll => {
            setDocs(coll)
        })

    },[collect])

    return docs
}

export { 
    useFirestore
}