import Logo from '../../assets/Logo2021-red.png'
import { useNavigate } from "react-router-dom";
import { Auth } from '../../state/Auth';
import { useContext, useState } from 'react';
import NotificationIcon from '../../assets/icons/notification-icon.png'
import ChatIcon from '../../assets/icons/chat-icon.png'
import SearchIcon from '../../assets/icons/search-icon.png'
import { NavLink } from "react-router-dom"
import Count from '../common/Count';
import Location from "../../helpers/location"
import { useFirestoreNewNotifications } from '../../helpers/useFirestore'
import changeStatus from '../common/ChangeStatus';
import UserIcon from '../../assets/icons/user-icon.png'
import SettingsIcon from '../../assets/icons/settings-icon.png'

const TopBar = () => {
  const [user] = useContext(Auth)

  const [showProfileDropdown, setShowProfileDropdown] = useState('none')

  const navigate = useNavigate()

  const id = Location()[3]

  const newNotifications = useFirestoreNewNotifications(id)

  const profileLink = () => {

    navigate(`profile/${user.id}`) 
    
    setShowProfileDropdown('none')
  }

  const settingsLink = () => {

    navigate(`settings/${user.id}`) 
    
    setShowProfileDropdown('none')
  }


  return (
      <div id='topbar-landing-container'>
        <img id='topbar-logo' src={Logo} alt="Logo Vitaminds" onClick={() => navigate(`/`)} />
        <div className='icon-container'>
          <NavLink to={`/dashboard/notifications/${user.id}`} activeClassName="selected" onClick={changeStatus(newNotifications, 'notifications')}>
            <div className='topbar-icon-inner-container'>
              <img src={NotificationIcon} alt="notification icon" />
              <Count count={newNotifications}/>
            </div>
          </NavLink>
          <NavLink to={`/dashboard/chats/${user.id}`} activeClassName="selected">
            <img src={ChatIcon} alt="chat icon" />
          </NavLink>
          <NavLink to={`/dashboard/search`} activeClassName="selected">
            <img src={SearchIcon} alt="search icon" />
          </NavLink>
        </div>
        <div>
          <div id='user-profile-container' onMouseEnter={() => setShowProfileDropdown('flex')}>
            <img src={user.avatar} alt="profile picture" />
            <p>{user.name}</p>
          </div>
          <div className='dropdown-container dropdown-container-profile' style={{display: showProfileDropdown}} onMouseLeave={() => setShowProfileDropdown('none')}>
            <div className='dropdown-icon-container'>
                <img src={UserIcon} alt="user-icon" onClick={profileLink}/>
                <p onClick={() => navigate(`profile/${user.id}`)} onClick={profileLink}>Profiel</p>
            </div>
            <div className='dropdown-icon-container'>
                <img src={SettingsIcon} alt="settings-icon" onClick={settingsLink}/>
                <p onClick={settingsLink}>Instellingen</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TopBar