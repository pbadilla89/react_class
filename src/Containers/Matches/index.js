import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import { changeActiveLeague } from '../../redux/Matches'
import { listMatches, playMatch , reloadMatch} from '../../redux/Matches/thunks'

import ModalOption from '../../components/Modals/modalOption'

import Table from '../../components/Table'

import useOption from '../../hooks/useOption'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const formState = {
  openModal: false,
}

const Matches = (props) => {

  const { reloadMatch, playMatch, MatchesReducer, LeaguesReducer, activeLeague, changeActiveLeague, listMatches} = props

  const { values, onCloseModal, save, onOpenModal } = useOption(formState, playMatch);

  useEffect(() => {
    listMatches()
  }, [])

  const { matches, headerMatch } = MatchesReducer
  const { leagues } = LeaguesReducer

  return ( <>
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
      <button className="btn btn-success w-100" onClick={ () => { reloadMatch() } }> <FontAwesomeIcon icon={["fas", "sync-alt"]} /> </button>
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

  return {
    ...state,
  }
}

const mapDispatchToProps = {
  reloadMatch,
  playMatch,
  changeActiveLeague,
  listMatches
}

export default  connect(mapStateToProps, mapDispatchToProps)(Matches)



