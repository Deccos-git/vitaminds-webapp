import Logo from '../../assets/Logo2021-red.png'
import { useNavigate } from "react-router-dom";
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import NotificationIcon from '../../assets/icons/notification-icon.png'
import ChatIcon from '../../assets/icons/chat-icon.png'
import SearchIcon from '../../assets/icons/search-icon.png'
import { NavLink } from "react-router-dom"
import Count from '../common/Count';
import Location from "../../helpers/location"
import { useFirestoreNewNotifications } from '../../helpers/useFirestore'
import changeStatus from '../common/ChangeStatus';

const TopBar = () => {
  const [user] = useContext(Auth)

  const navigate = useNavigate()

  const id = Location()[3]

  const newNotifications = useFirestoreNewNotifications(id)


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
        <div id='user-profile-container' onClick={() => navigate(`profile/${user.id}`)}>
          <img src={user.avatar} alt="profile picture" />
          <p>{user.name}</p>
        </div>
      </div>
  )
}

export default TopBar