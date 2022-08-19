import Logo from '../../assets/Logo2021-red.png'
import { useNavigate } from "react-router-dom";
import { Auth } from '../../state/Auth';
import { useContext } from 'react';

const TopBar = () => {
  const [user] = useContext(Auth)

  const navigate = useNavigate()

  return (
      <div id='topbar-landing-container'>
        <img id='topbar-logo' src={Logo} alt="Logo Vitaminds" onClick={() => navigate(`/`)} />
        <div id='user-profile-container' onClick={() => navigate(`profile/${user.id}`)}>
          <img src={user.avatar} alt="profile picture" />
          <p>{user.name}</p>
        </div>
      </div>
  )
}

export default TopBar