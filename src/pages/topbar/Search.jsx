import { useFirestore } from '../../helpers/useFirestore'
import { useNavigate } from "react-router-dom"
import timestampOptions from '../../helpers/timestampOptions'
import { useState } from 'react'
import { Auth } from '../../state/Auth';
import { useContext } from 'react';

const Search = () => {
    const [user] = useContext(Auth)

    const [input, setInput] = useState(null)

    const navigate = useNavigate()

    const items = useFirestore('search')

    const inputHandler = (e) => {
        const input = e.target.value 

        setInput(input === "" ? null : input)
    }

    const filter = () => {

        const itemArray = []

        items && items.forEach(item => {
            if(item.content.includes(input)){
                itemArray.push(item)
            }
        })

        return itemArray
    }

    const itemLink = (e) => {

        const url = e.target.dataset.url

        navigate(`/dashboard/${url}`)
    }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <h1>Zoeken</h1>
        </div>
        <div className='banner-container'>
            <input type="text" placeholder={`Waar zoek je naar, ${user.name}?`} onChange={inputHandler} />
            {filter().map(item => (
                <div className='banner' key={item.id}>
                    <p>{item.content}</p>
                    <p>{item.timestamp.toDate().toLocaleDateString("nl-NL", timestampOptions())}</p>
                    <button onClick={itemLink} data-url={item.url}>Bekijk</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Search