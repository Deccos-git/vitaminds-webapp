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

const useFirestoreLikes = (id) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, 'likes');
        const q = query(col, where("message", '==', id))
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

const useFirestoreNotifications = (id) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, 'notifications');
        const q = query(col, where("reciever", '==', id), orderBy("timestamp", 'desc'))
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

const useFirestoreNewNotifications = (id) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, 'notifications');
        const q = query(col, where("reciever", '==', id), where("new", '==', true))
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

const useFirestoreMemberships = (type, id, auth) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, 'memberships');
        const q = query(col, where(type, '==', id), where("user", '==', auth))
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

    },[type, id, auth])

    return docs
}

const useFirestoreGroups = (id) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, 'groups');
        const q = query(col, where('academy', '==', id))
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

const useFirestoreArticles = (id) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, 'articles');
        const q = query(col, where('academy', '==', id))
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

const useFirestoreRoles = (role) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, 'roles');
        const q = query(col, where('role', '==', role))
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

    },[role])

    return docs
}

const useFirestoreRolesAcademy = (role, id) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, 'roles');
        const q = query(col, where('role', '==', role), where('user', '==', id))
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

    },[role, id])

    return docs
}

const useFirestoreChats = (id) => {

    const [docs, setDocs] = useState("")

    const getCollection = async () => {

        const col = collection(db, 'chats');
        const q = query(col, where('users', 'array-contains', id))
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
    useFirestoreMessage,
    useFirestoreLikes,
    useFirestoreNotifications,
    useFirestoreNewNotifications,
    useFirestoreMemberships,
    useFirestoreGroups,
    useFirestoreArticles,
    useFirestoreRoles,
    useFirestoreRolesAcademy,
    useFirestoreChats
}