import { useNavigate } from "react-router-dom"
import { useFirestoreOrdered } from '../../helpers/useFirestore'

const Stories = () => {

    const navigate = useNavigate()

    const stories = useFirestoreOrdered('stories','asc')

    const showStory = (e) => {

        const id = e.target.dataset.id

        navigate(`/dashboard/story/${id}`)
    }

    return (
      <div className='page-container'>
        <h1>Ervaringsverhalen</h1>
        <p onClick={() => navigate(`/dashboard/createstorie`)}>Deel jouw verhaal</p>
        <div className='card-container'>
            {stories && stories.map(story => (
                <div className='card' key={story.id}>
                    <h2>{story.title}</h2>
                    <div className='button-container'>
                        <button data-id={story.id} onClick={showStory}>Bekijk</button>
                    </div>
                </div>
            ))}

        </div>
      </div>
    )
  }
  
  export default Stories