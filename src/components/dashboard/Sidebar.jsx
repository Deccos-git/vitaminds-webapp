import { NavLink } from "react-router-dom"
import ActivityIcon from '../../assets/icons/activity-icon.png'
import FileIcon from '../../assets/icons/file-icon.png'
import GroupIcon from '../../assets/icons/group-icon.png'
import HomeIcon from '../../assets/icons/home-icon.png'
import { useFirestore } from "../../helpers/useFirestore"

const Sidebar = () => {

  const groups = useFirestore('groups')
  const academies = useFirestore('academies')

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
        {academies && academies.map(academie => (
          <div key={academie.id} className='sidebar-link-container'>
            <img src={HomeIcon} alt="group icon" />
            <NavLink to={`/dashboard/academy/${academie.id}`} activeClassName="selected">{academie.name}</NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar