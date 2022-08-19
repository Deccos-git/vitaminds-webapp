import Location from "../../helpers/location"
import { useFirestoreId } from "../../helpers/useFirestore"

const Academy = () => {

    const id = Location()[3]

    const academies = useFirestoreId('academies', id)

  return (
    <div className='page-container'>
        {academies && academies.map(academy => (
            <>
            <div className='page-top-container'>
                <h1>{academy.name}</h1>
            </div>
            <div>
                <h2>Groepen</h2>
            </div>
            <div>
                <h2>Documenten</h2>
            </div>
            </>
        ))}
    </div>
  )
}

export default Academy