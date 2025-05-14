import React from 'react'
import Login from '../components/Authentication/LoginForm'
import Loginimage from "../assets/loginImage.jpg";
const LoginPage = () => {
  return (
    <>
   <div
  className="bg-cover bg-center flex items-center justify-center rounded-2xl"
  style={{ backgroundImage: `url(${Loginimage})` }}
>
  <Login />
</div>
    </>
  )
}

export default LoginPage