import React from 'react';

import { connect } from 'react-redux'
import { refreshMatch, playMatch, changeActiveLeague } from '../../redux/Matches'

import ModalOption from '../../components/Modals/modalOption'

import Table from '../../components/Table'

import useOption from '../../hooks/useOption'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const formState = {
  openModal: false,
}

const Matches = (props) => {

  const { refreshMatch, playMatch, MatchesReducer, LeaguesReducer, activeLeague, changeActiveLeague} = props

  const { values, onCloseModal, save, onOpenModal } = useOption(formState, playMatch);

  const { matches, headerMatch } = MatchesReducer
  const { leagues } = LeaguesReducer

  return ( <>
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
      <button className="btn btn-success w-100" onClick={ () => { refreshMatch() } }> <FontAwesomeIcon icon={["fas", "sync-alt"]} /> </button>
    </div>
    <div className="container">
      <label className="form-control"> Results / Fixtures </label>
      <Table list={matches} headers={headerMatch} action="Mathes"  relation={"home"} relation2={"away"} forms={{ values, onOpenModal, onCloseModal, save }} />

      <ModalOption title="Play The Match" forms={{ values, onCloseModal, save }} />
    </div>
    </>
  )
}

const mapStateToProps = state => {

  let { MatchesReducer, CountriesReducer, TeamsReducer, LeaguesReducer } = state

  let { matches } = MatchesReducer
  let { teams, activeLeague } = TeamsReducer

  const { countries } = CountriesReducer
  const { leagues } = LeaguesReducer

  if( activeLeague === "" ){
    activeLeague = leagues[0]["_id"]
  }

  let matches2 = matches.filter( ( mat ) => mat.league === activeLeague )

  let new_matches = matches2.map( ( mat ) => {
    const homeTeam = teams.filter( ( tms ) => tms._id === mat.idHome )[0]
    const awayTeam = teams.filter( ( tms ) => tms._id === mat.idAway )[0]

    const options = [
      { id: "1", value: "idHome", label: `Gana ${homeTeam.name}` },
      { id: "2", value: "none", label: `Empatan` },
      { id: "3", value: "idHome", label: `Gana ${awayTeam.name}` }
    ]

    const home_next = countries[countries.findIndex( (rl) => rl._id === homeTeam["country"])]["name"]
    const away_next = countries[countries.findIndex( (rl) => rl._id === awayTeam["country"])]["name"]
    return { 
      ...mat,
      home: homeTeam.name,
      away: awayTeam.name,
      options,
      home_next,
      away_next }
  } )

  return {
    ...state,
    MatchesReducer: {
      ...state.MatchesReducer,
      matches: new_matches
    },
    TeamsReducer: {
      ...state.TeamsReducer,
      activeLeague
    }
  }
}

const mapDispatchToProps = {
  refreshMatch,
  playMatch,
  changeActiveLeague
}

export default  connect(mapStateToProps, mapDispatchToProps)(Matches)



