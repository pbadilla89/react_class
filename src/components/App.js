import React from 'react';

import './App.css';

import { connect } from 'react-redux'
import { addTeam, refreshMatch, editTeam, removeTeam, playMatch } from '../redux/all/teams'

import ModalTeam from './Modals/modalTeam'
import ModalMatch from './Modals/modalMatch'

import Table from './table/table'

import useForm from '../hooks/useForm'

const formState = {
  openModal: false,
  name: "",
  country: "",
  action: "add",
  openModalMatch: false,
  is_valid: true
}

const App = (props) => {

  const { addTeam, editTeam, removeTeam, refreshMatch, playMatch, listTeam, headerTeam, listMarch, headerMatch} = props

  const { values, onOpenModal, onCloseModal, handleInputChange, save, onCloseModalMatch, saveMatch, onOpenModalMatch, validate } = useForm(formState, addTeam, editTeam, removeTeam, playMatch);

  return (
    <>
      <div className="container">
        <button className="btn btn-primary" onClick={ () => { onOpenModal("add") } }>Agregar Equipo</button>
        <ModalTeam forms={{ values, onCloseModal, handleInputChange, validate }} />
      </div>

      <div className="container">
        <label className="form-control"> Tabla de Posiciones </label>
        <Table list={listTeam} headers={headerTeam} action="position" forms={{ values, onOpenModal, onCloseModal, handleInputChange, save }} />
      </div>

      <div className="container">
        <button className="btn btn-primary" onClick={ () => { refreshMatch() } }>Actualizar Partidos</button>
        <label className="form-control"> Partidos </label>
        <Table list={listMarch} headers={headerMatch} action="Mathes" forms={{ values, onOpenModalMatch, onCloseModalMatch, saveMatch }} />

        <ModalMatch forms={{ values, onCloseModalMatch, saveMatch }} />
      </div>
    </>
  );
}

const mapStateToProps = state => {

  let new_matches = state.matches.map( ( mat ) => {
    let homeTeam = state.teams.filter( ( tms ) => tms.id === mat.home )[0]
    let awayTeam = state.teams.filter( ( tms ) => tms.id === mat.away )[0]
    let id = mat.id
    let win = mat.win
    return { id, home: homeTeam.name, idHome: homeTeam.id, away: awayTeam.name, idAway: awayTeam.id, win }
  } )

  let state2 = {
    listTeam: state.teams,
    headerTeam: state.headerTeam,

    listMarch: new_matches,
    headerMatch: state.headerMatch
  }
  
  return {
    ...state2
  }
}

const mapDispatchToProps = {
  addTeam,
  refreshMatch,
  editTeam,
  removeTeam,
  playMatch
}

export default  connect(mapStateToProps, mapDispatchToProps)(App)



