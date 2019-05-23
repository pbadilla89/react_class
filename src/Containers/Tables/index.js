import React from 'react';

import { connect } from 'react-redux'
import { changeActiveLeague } from '../../redux/Teams'
import { refreshMatch } from '../../redux/Matches'

import Table from '../../components/Table'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Tables = (props) => {

  const { teams2, headerTeamTable, leagues, refreshMatch, activeLeague, changeActiveLeague} = props

  return (
    <>
      <div className="container mb-3 mt-3">
        <select className="form-control" value={ activeLeague } onChange={ (e) => { changeActiveLeague(e.target.value) }} >
          {
            leagues.map( ( leg, indLeg ) => {
              return ( <option key={indLeg} value={leg.id} > { leg.name } </option> )
            } )
          }
        </select>
      </div>

      <div className="col-6 offset-3 mb-3 mt-3">
        <div className="btn-group d-flex" role="group">
          <button className="btn btn-success" onClick={ () => { refreshMatch() } }> <FontAwesomeIcon icon={["fas", "sync-alt"]} /> </button>
        </div>
      </div>

      <div className="container">
        <label className="form-control"> Table </label>
        <Table list={teams2} headers={headerTeamTable} relation={"name"} minList={2} action=""  />
      </div>

    </>
  );
}

const mapStateToProps = state => {
  let { teams, headerTeam, activeLeague, headerTeamTable } = state.TeamsReducer
  const { countries } = state.CountriesReducer
  const { leagues } = state.LeaguesReducer

  if( activeLeague === "" ){
    activeLeague = leagues[0]["id"]
  }

  let teams2 = teams.filter( ( tem ) => tem.league === activeLeague )

  teams2 = teams2.map( ( tms, incTms ) => {

    return {
      ...tms,
      pos: incTms+1,
      name_next: countries[countries.findIndex( (rl) => rl.id === tms["country"])]["name"]
    }
  } )

  return  { teams2, headerTeam, countries, activeLeague, leagues, headerTeamTable }
}

const mapDispatchToProps = {
  refreshMatch,
  changeActiveLeague
}

export default  connect(mapStateToProps, mapDispatchToProps)(Tables)



