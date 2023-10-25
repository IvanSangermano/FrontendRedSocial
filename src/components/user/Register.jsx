import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/global'

export const Register = () => {

  const { form, changed } = useForm({})
  const [ saved, setSaved ] = useState("not_saved")

  const saveUser = async (e) => {
    e.preventDefault();
    let newUser = form;

    const request = await fetch(Global.url + "user/register" , 
      {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        }
      }
    )

    const data = await request.json();
    console.log(data)

    data.status == "success" ? setSaved("saved") : setSaved("error")
  }

  return (
    <>
        <header className="content__header content__header--public">
            <h1 className="content__title">Sign Up</h1>
        </header>

        <div className="content__posts">

            {saved == "saved" ? <strong className='alert alert-success'>Successfully registered user</strong>: ''}
            {saved == "error" ? <strong className='alert alert-danger'>The user could not register correctly</strong> : ''}


            <form className='register-form' onSubmit={saveUser}>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' name="name" onChange={changed}/>
              </div>
              <div className='form-group'>
                <label htmlFor='surname'>Surname</label>
                <input type='text' name="surname" onChange={changed}/>
              </div>
              <div className='form-group'>
                <label htmlFor='nick'>Nick</label>
                <input type='text' name="nick" onChange={changed}/>
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' name="email" onChange={changed}/>
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' name="password" onChange={changed}/>
              </div>

              <input type='submit' value="Register" className='btn btn-sucess'/>
            </form>
        </div>
    </>
  )
}
