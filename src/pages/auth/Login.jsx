import React from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ButtonClicked from "../../hooks/ButtonClicked";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

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

  return (
    <div className='login-register-container'>
        <h1>Login</h1>
        <p>Email</p>
        <input type="text" placeholder='Schrijf hier je email' onChange={emailHandler} />
        <p>Paswoord</p>
        <input type="password" placeholder='Schrijf hier je paswoord' onChange={passwordHandler} />
        <div className='button-container'>
            <button onClick={login}>Login</button>
        </div>
        <p>Nog geen account? 
        <Link to="/register"> Registreer</Link>
        </p>
    </div>
  )
}

export default Login