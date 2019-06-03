import {
  reloadUser
} from './index'

import { post } from 'axios'

const HostApi = "http://andbytes.com:2889"

export const listUsers = () =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await post(`${HostApi}/api/listUsers`,{}, config)

  dispatch(reloadUser(res.data))
}

export const saveUser = ( user ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await post(`${HostApi}/api/addUser`,user, config)
  console.log(res)
  dispatch(reloadUser(res.data, false))
}

export const removeUser = ( users ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await post(`${HostApi}/api/removeUser`, users.lst, config)
  console.log(res)
  dispatch(listUsers())
}
