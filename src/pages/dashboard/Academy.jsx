import Location from "../../helpers/location"
import { useFirestoreId, useFirestoreGroups, useFirestoreArticles, useFirestoreMemberships } from "../../helpers/useFirestore"
import { useNavigate } from "react-router-dom";
import timestampOptions from '../../helpers/timestampOptions'
import { Auth } from '../../state/Auth';
import { useContext } from 'react';

const Academy = () => {
    const [auth] = useContext(Auth)

    const id = Location()[3]
    const navigate = useNavigate()

    const academies = useFirestoreId('academies', id)
    const authAcademies = useFirestoreMemberships('academy', id, auth.id)

    const Groups = ({academy}) => {

        const groups = useFirestoreGroups(academy.id)

        return(
            <div className='card-container'>
                {groups && groups.map(group => (
                    <div key={group.id} className='card'>
                        <h2>{group.name}</h2>
                        <p>{group.description}</p>
                        <div className='button-container card-button-container'>
                            <button onClick={() => navigate(`/dashboard/group/${group.id}`)}>Bekijk</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const Articles = ({academy}) => {

        const articles = useFirestoreArticles(academy.id)

        const User = ({item}) => {

            const users = useFirestoreId('users', item.user)
    
            return(
                <div className='story-meta-container' >
                    {users && users.map(user => (
                        <div key={user.id} className='user-meta-container'>
                            <img src={user.avatar} alt="user avatar" />
                            <p>{user.name}</p>
                        </div>
                    ))}
                    <p>{item.timestamp.toDate().toLocaleDateString("nl-NL", timestampOptions())}</p>
                </div>
            )
        }

        return(
            <div className='card-container'>
                {articles && articles.map(item => (
                    <div key={item.id} className='card'>
                        <img src={item.banner} alt="article banner" />
                        <h2>{item.title}</h2>
                        <User item={item}/>
                        <div className='button-container card-button-container'>
                            <button onClick={() => navigate(`/dashboard/article/${item.id}`)}>Bekijk</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

  return (
    <div className='page-container'>
        {academies && academies.map(academy => (
            <div key={academy.id}>
                <div className='page-top-container'>
                    <h1>{academy.name}</h1>
                </div>
                <div>
                    <div className='academy-section-header-container'>
                        <h2>Groepen</h2>
                        <button onClick={() => navigate(`/dashboard/addgroup/${academy.id}`)} style={{display: authAcademies.length > 0 ? 'block' : 'none'}}>+</button>
                    </div>
                    <Groups academy={academy}/>
                </div>
                <div>
                    <div className='academy-section-header-container'>
                        <h2>Documenten</h2>
                        <button onClick={() => navigate(`/dashboard/addarticle/${academy.id}`)} style={{display: authAcademies.length > 0 ? 'block' : 'none'}}>+</button>
                    </div>
                    <Articles academy={academy}/>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Academy