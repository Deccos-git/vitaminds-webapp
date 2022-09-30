import React from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ButtonClicked from "../../hooks/ButtonClicked";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Logo from '../../assets/Logo2021-red.png'
import { Auth } from '../../state/Auth';

const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [user] = useContext(Auth)

  console.log(user)

  const navigate = useNavigate()

  const login = (e) => {

    ButtonClicked(e, 'Inloggen')

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        navigate(`/dashboard/wall`)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }

  const emailHandler = (e) => {
    const value = e.target.value 

    setEmail(value)
  }

  const passwordHandler = (e) => {
      const value = e.target.value 

      setPassword(value)
  }

  const isAuth = () => {
    if(user){
      navigate(`/dashboard/wall`)
    }
  }

  isAuth()

  return (
    <div className="layout-container">
      <div id='topbar-landing-container'>
        <img id='topbar-logo' src={Logo} alt="Logo Vitaminds" onClick={() => navigate(`/`)} />
      </div>
      <div className='login-register-container'>
          <h1>Login</h1>
          <p>Email</p>
          <input type="email" placeholder='Schrijf hier je email' onChange={emailHandler} />
          <p>Paswoord</p>
          <input type="password" placeholder='Schrijf hier je paswoord' onChange={passwordHandler} />
          <div className='button-container'>
              <button onClick={login}>Login</button>
          </div>
          <p>Nog geen account? 
          <Link to="/register"> Registreer</Link>
          </p>
      </div>
    </div>
  )
}

export default Login