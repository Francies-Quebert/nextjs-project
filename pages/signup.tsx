import React, { useMemo, useRef, useState } from 'react'
import axios from 'axios'

const signup = () => {
    const [inputValues, setInputValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        isLoading:false
    })

    function updateInput(e: any) {
        setInputValues({ ...inputValues, [e.target.id]: e.target.value })
    }

    async function onButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
       
        const {
            username,
            email,
            password,
        } = inputValues
        const body = {
            username,
            email,
            password,
        }
        try {
            await axios.post('/api/1.0/users', body).then((res: any) => {
                console.log(res, 'response')
                setInputValues({ ...inputValues, isLoading: true })
       
            }).catch(err => {
                throw err
            })

        } catch (err) {
            console.log(err, 'Error')
        } finally {
            setInputValues({ ...inputValues, isLoading: false })
        }

        // fetch('/api/1.0/users', {
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify(body)
        // })
    }


    const buttonDisabled = useMemo(() => inputValues.password == '' || inputValues.isLoading ? true : (inputValues.password !== inputValues.passwordRepeat)  ? true : false, [inputValues.password, inputValues.passwordRepeat,inputValues.isLoading])
    return (
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
        <form className="card mt-5">
          <div className="card-header">
            <h1 className="text-center">Sign Up</h1>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                className="form-control"
                onChange={updateInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                E-mail
              </label>
              <input
                className="form-control"
                id="email"
                onChange={updateInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                id="password"
                type="password"
                onChange={updateInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="passwordRepeat">
                Password Repeat
              </label>
              <input
                className="form-control"
                id="passwordRepeat"
                type="password"
                onChange={updateInput}
              />
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={buttonDisabled}
                onClick={onButtonClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
        // <div>
        //     <h1>signup</h1>
        //     <label htmlFor='username'>Username</label>
        //     <input type={'text'} id='username' onChange={updateInput} />
        //     <label htmlFor='email'>Email</label>
        //     <input type={'text'} id='email' onChange={updateInput} />
        //     <label htmlFor='password'>Password</label>
        //     <input type={'password'} id='password' onChange={updateInput} value={inputValues.password} />
        //     <label htmlFor='passwordRepeat'>Password Repeat</label>
        //     <input type={'password'} id='passwordRepeat' onChange={updateInput} value={inputValues.passwordRepeat} />
        //     <button disabled={buttonDisabled} onClick={onButtonClick}>Sign Up</button>
        // </div>
    )
}

export default signup