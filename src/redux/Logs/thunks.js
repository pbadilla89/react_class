import {
  logIn,
  logOut,
  changeLoading
} from './index'

import { post } from 'axios'

const HostApi = "http://andbytes.com:2889"

export const loginUser = ( users ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const { email, password } = users
  const res = await post(`${HostApi}/api/loginUser`, { email, password }, config)
  if(res.data.status){
    localStorage.setItem("token",res.data.token);
    dispatch(logIn())
  }
  
}

export const registerUser = ( users ) =>  async (dispatch, getState) => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const { email2, password2, name2, lastname2 } = users

  const res = await post(`${HostApi}/api/addUser`, { email: email2, password: password2, name: name2, lastname: lastname2, role: "admin" }, config)
  console.log(res)
  if(res.data.status){
    alert("Esta Registrado, ahora puede logearse")
  }
  
}

export const validateSession = ( ) => async (dispatch, getState) => {
  if(localStorage.getItem("token") && localStorage.getItem("token") != "undefined"){
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    dispatch(changeLoading( true ))
    const res = await post(`${HostApi}/api/validateSession`, { token: localStorage.getItem("token") }, config)
    console.log(res)
    if(res.data.status){
      dispatch(logIn())
    } else {
      dispatch(logOut())
    }
  } else {
    dispatch(logOut())
  }
}
