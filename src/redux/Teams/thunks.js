import {
  reloadTeam
} from './index'

import { post } from 'axios'

const HostApi = "http://andbytes.com:2889"

export const listTeams = () =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await post(`${HostApi}/api/listTeams`,{}, config)
  console.log(res)
  dispatch(reloadTeam(res.data))
}

export const saveTeam = ( country ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  console.log(country)
  const res = await post(`${HostApi}/api/addTeam`,country, config)
  console.log(res)
  dispatch(listTeams())
}

export const removeTeam = ( teams ) =>  async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await post(`${HostApi}/api/removeTeam`, teams.lst, config)
  console.log(res)
  dispatch(listTeams())
}
