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

const useFirestoreOrdered = (collect, order) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, collect);
        const q = query(col, orderBy("timestamp", order))
        const snapshot = await getDocs(q);

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

    },[collect, order])

    return docs
}

const useFirestoreId = (collect, id) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, collect);
        const q = query(col, where("id", '==', id))
        const snapshot = await getDocs(q);

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

    },[collect, id])

    return docs
}

const useFirestoreMessage = (id) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, 'messages');
        const q = query(col, where("itemId", '==', id), orderBy("timestamp", 'desc'))
        const snapshot = await getDocs(q);

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

    },[id])

    return docs
}

export { 
    useFirestore,
    useFirestoreOrdered,
    useFirestoreId,
    useFirestoreMessage
}