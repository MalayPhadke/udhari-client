import React from 'react'
import {Link} from "react-router-dom";
import {Navigate} from "react-router";
import Axios from 'axios';
import { config } from '../config';

export default function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirectTo, setredirectTo] = React.useState(null);
  
  const loginUser = (e) => {
    e.preventDefault();
    Axios.post(`${config.SERVER_URI}/login`, {username, password})
      .then(res => {
        if(typeof res.data === 'object' && res.data !== null){
          props.updateUser({
            isLoggedIn: true,
            username: res.data.username
          })
          setredirectTo("/home");
        }else {
          alert(res.data);
        }
      })
      .catch(error => {console.log(error)})
  }

  if(redirectTo){
      return <Navigate to={{ pathname: redirectTo }} />
  }else {
    return ( 
      <>
      <aside>
          <div className='login-box login-1' >
              <div className='login-email'>
                <label htmlFor="login-email">Username</label>
                <input type="text" name='login-email' value={username} onChange={e => {setUsername(e.target.value)}} required />
              </div>
              <div className='login-password'>
                <label htmlFor="login-password">Password</label>
                <input type="password" name='login-password' onChange={e => {setPassword(e.target.value)}} required />
              </div>
              <input type="submit" id='login-button' onClick={loginUser} value="Log in"/>
              <Link className='login-link' to="/register">Not a Registered User? Register Now!</Link>
          </div>
      </aside>
      </>
    )
  }
}
