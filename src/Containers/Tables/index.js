import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import { changeActiveLeague } from '../../redux/Teams'
import { listTeams } from '../../redux/Teams/thunks'

import { reloadMatch} from '../../redux/Matches/thunks'

import Table from '../../components/Table'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Tables = (props) => {

  const { teams2, headerTeamTable, leagues, reloadMatch, activeLeague, changeActiveLeague, listTeams} = props

  useEffect(() => {
    listTeams()
  }, [])

  return (
    <>
      <div className="container mb-3 mt-3">
        <select className="form-control" value={ activeLeague } onChange={ (e) => { changeActiveLeague(e.target.value) }} >
          {
            leagues.map( ( leg, indLeg ) => {
              return ( <option key={indLeg} value={leg._id} > { leg.name } </option> )
            } )
          }
        </select>
      </div>

      <div className="col-6 offset-3 mb-3 mt-3">
        <div className="btn-group d-flex" role="group">
          <button className="btn btn-success" onClick={ () => { reloadMatch() } }> <FontAwesomeIcon icon={["fas", "sync-alt"]} /> </button>
        </div>
      </div>

      <div className="container">
        <label className="form-control"> Table </label>
        <Table list={teams2} headers={headerTeamTable} relation={"name"} minList={2} action=""  />
      </div>

    </>
  )
}

const mapStateToProps = state => {
  let { teams, headerTeam, activeLeague, headerTeamTable, countries, leagues } = state.TeamsReducer

  console.log(countries, leagues, teams)

  let teams2 = teams

  if(leagues.length > 0){
    console.log("bien")

    if( activeLeague === "" ){
      activeLeague = leagues[0]["_id"]
    }

    console.log(teams)

    teams2 = teams.filter( ( tem ) => tem.league._id === activeLeague )

    teams2 = teams2.map( ( tms, incTms ) => {

      return {
        ...tms,
        pos: incTms+1,
        name_next: tms.country.name
      }
    } )
  }

  return  { teams2, headerTeam, countries, activeLeague, leagues, headerTeamTable }
}

const mapDispatchToProps = {
  reloadMatch,
  changeActiveLeague,
  listTeams
}

export default  connect(mapStateToProps, mapDispatchToProps)(Tables)



