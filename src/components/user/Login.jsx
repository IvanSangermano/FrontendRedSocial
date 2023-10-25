import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'

export const Login = () => {
  const {form, changed} = useForm({})
  const [loged, setLoged] = useState("not loged")

  const {setAuth} = useAuth({})

  const logInUser = async(e) => {
    e.preventDefault();

    let userToLogin = form;

    const request = await fetch(Global.url + 'user/login', {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type":"application/json"
      }
    });

    const data = await request.json()
    if(data.status == "success"){ 
      
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      setLoged("login") 

      setAuth(data.user)

      //redireccion a la parte privada
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } else setLoged("error")
  }

  return (
    <>
        <header className="content__header content__header--public">
            <h1 className="content__title">Login</h1>
        </header>

        <div className="content__posts" onSubmit={logInUser}>
            {loged == "login" ? <strong className='alert alert-success'>User logged in correctly</strong>: ''}
            {loged == "error" ? <strong className='alert alert-danger'>The user could not logged correctly</strong> : ''}


          <form className='form-login'>
             <div className='form-group'> 
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' onChange={changed}/>
             </div>

             <div className='form-group'> 
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' onChange={changed}/>
             </div>

             <input type='submit' value="LogIn" className='btn btn-success'/>
          </form>
        </div>
    </>
  )
}
