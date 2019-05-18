import React from 'react';

import { connect } from 'react-redux'
import { refreshMatch, playMatch } from '../../redux/Matches'

import ModalMatch from '../../components/Modals/modalMatch'

import Table from '../../components/Table'

import useMatch from '../../hooks/useMatch'

const formState = {
  openModalMatch: false,
}

const Matches = (props) => {

  const { refreshMatch, playMatch, MatchesReducer} = props

  const { values, onCloseModalMatch, saveMatch, onOpenModalMatch } = useMatch(formState, playMatch);

  const { matches, headerMatch } = MatchesReducer

  return (
    <div className="container">
      <button className="btn btn-primary" onClick={ () => { refreshMatch() } }>Reiniciar</button>
      <label className="form-control"> Partidos </label>
      <Table list={matches} headers={headerMatch} action="Mathes" forms={{ values, onOpenModalMatch, onCloseModalMatch, saveMatch }} />

      <ModalMatch forms={{ values, onCloseModalMatch, saveMatch }} />
    </div>
  )
}

const mapStateToProps = state => {

  const { matches } = state.MatchesReducer
  const { teams } = state.TeamsReducer

  let new_matches = matches.map( ( mat ) => {
    const homeTeam = teams.filter( ( tms ) => tms.id === mat.idHome )[0]
    const awayTeam = teams.filter( ( tms ) => tms.id === mat.idAway )[0]

    console.log(homeTeam)
    console.log(awayTeam)

    const id = mat.id
    const win = mat.win
    return { id, home: homeTeam.name, idHome: homeTeam.id, away: awayTeam.name, idAway: awayTeam.id, win }
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



