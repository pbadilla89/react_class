import React from 'react';

import { connect } from 'react-redux'
import { refreshMatch, playMatch } from '../../redux/Matches'

import ModalOption from '../../components/Modals/modalOption'

import Table from '../../components/Table'

import useOption from '../../hooks/useOption'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const formState = {
  openModal: false,
}

const Matches = (props) => {

  const { refreshMatch, playMatch, MatchesReducer} = props

  const { values, onCloseModal, save, onOpenModal } = useOption(formState, playMatch);

  const { matches, headerMatch } = MatchesReducer

  return ( <>
    <div className="container">
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

  const { matches } = state.MatchesReducer
  let { teams } = state.TeamsReducer

  const { countries } = state.CountriesReducer



  let new_matches = matches.map( ( mat ) => {
    const homeTeam = teams.filter( ( tms ) => tms.id === mat.idHome )[0]
    const awayTeam = teams.filter( ( tms ) => tms.id === mat.idAway )[0]

    const options = [
      { id: "1", value: "idHome", label: `Gana ${homeTeam.name}` },
      { id: "2", value: "none", label: `Empatan` },
      { id: "3", value: "idHome", label: `Gana ${awayTeam.name}` }
    ]

    const home_next = countries[countries.findIndex( (rl) => rl.id === homeTeam["country"])]["name"]
    const away_next = countries[countries.findIndex( (rl) => rl.id === awayTeam["country"])]["name"]
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
    }
  }
}

const mapDispatchToProps = {
  refreshMatch,
  playMatch
}

export default  connect(mapStateToProps, mapDispatchToProps)(Matches)



