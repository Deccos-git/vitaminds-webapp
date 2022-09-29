import { NavLink } from "react-router-dom"
import ActivityIcon from '../../assets/icons/activity-icon.png'
import FileIcon from '../../assets/icons/file-icon.png'
import GroupIcon from '../../assets/icons/group-icon.png'
import HomeIcon from '../../assets/icons/home-icon.png'
import SkylineIcon from '../../assets/icons/skyline-icon.png'
import { useFirestoreGroups, useFirestoreId, useFirestoreMemberships } from "../../helpers/useFirestore"
import { Auth } from '../../state/Auth';
import { useContext } from 'react';

const Sidebar = () => {
  const [auth] = useContext(Auth)

  const groups = useFirestoreGroups('public')
  const academiesMember = useFirestoreMemberships('type', 'academy',  auth.id)

  const Academies = ({item}) => {

    const academies = useFirestoreId('academies', item.academy)

    return(
      <>
        {academies && academies.map(academie => (
          <div key={academie.id} className='sidebar-link-container'>
            <img src={HomeIcon} alt="group icon" />
            <NavLink to={`/dashboard/academy/${academie.id}`} activeClassName="selected">{academie.name}</NavLink>
          </div>
        ))}
      </>
    )
  }

  return (
    <div id='sidebar-container'>
      <div className='sidebar-inner-container'>
        <h2>Home</h2>
        <div className='sidebar-link-container'>
          <img src={ActivityIcon} alt="activity icon" />
          <NavLink to="/dashboard/wall" activeClassName="selected">Activiteit</NavLink>
        </div>
      </div>

      <div className='sidebar-inner-container'>
        <h2>Delen</h2>
        <div className='sidebar-link-container'>
          <img src={FileIcon} alt="file icon" />
          <NavLink to="/dashboard/stories" activeClassName="selected">Ervaringsverhalen</NavLink>
        </div>
      </div>

      <div className='sidebar-inner-container'>
        <h2>Groepen</h2>
        {groups && groups.map(group => (
          <div key={group.id} className='sidebar-link-container'>
            <img src={GroupIcon} alt="group icon" />
            <NavLink to={`/dashboard/group/${group.id}`} activeClassName="selected">{group.name}</NavLink>
          </div>
        ))}
      </div>

      <div className='sidebar-inner-container'>
        <h2>Herstelacademies</h2>
        <div className='sidebar-link-container'>
          <img src={SkylineIcon} alt="file icon" />
          <NavLink to="/dashboard/academies" activeClassName="selected">Alle academies</NavLink>
        </div>
        {academiesMember && academiesMember.map(item => (
          <Academies item={item}/>
        ))}
        
      </div>
    </div>
  )
}

export default Sidebar