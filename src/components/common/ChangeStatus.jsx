import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../libs/firebase'

const changeStatus = (items, type) => {

    const updateItem = async (docid) => {
        await updateDoc(doc(db, type, docid), {
            new: false
          })
    }

    items && items.forEach(item => {

        const docid = item.docid

         updateItem(docid)
    })
}

export default changeStatus