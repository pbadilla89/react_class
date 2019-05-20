import React from 'react';

import { connect } from 'react-redux'
import { addTeam, editTeam, removeTeam } from '../../redux/Teams'
import { refreshMatch } from '../../redux/Matches'

import ModalTeam from '../../components/Modals/modalTeam'

import Table from '../../components/Table'

import useForm from '../../hooks/useForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let formState = {
  openModal: false,
  name: "",
  country: "",
  action: "add",
  is_valid: true
}

const Teams = (props) => {

  const { addTeam, editTeam, removeTeam, teams, headerTeam, countries, refreshMatch} = props

  formState = {
    ...formState,
    countries
  }

  const { values, onOpenModal, onCloseModal, handleInputChange, save, validate } = useForm(formState, addTeam, editTeam, removeTeam);

  return (
    <>
      <div className="container">
        <div className="btn-group d-flex" role="group">
          <button className="btn btn-primary" onClick={ () => { onOpenModal("add") } }> <FontAwesomeIcon icon={["fas", "plus"]} /></button>
          <button className="btn btn-success" onClick={ () => { refreshMatch() } }> <FontAwesomeIcon icon={["fas", "sync-alt"]} /> </button>
        </div>
      </div>
      <div className="container">
        <ModalTeam forms={{ values, onCloseModal, handleInputChange, validate }} />
      </div>

      <div className="container">
        <label className="form-control"> Tabla de Posiciones </label>
        <Table list={teams} headers={headerTeam} minList={2} action="position" forms={{ values, onOpenModal, onCloseModal, handleInputChange, save }} />
      </div>

    </>
  );
}

const mapStateToProps = state => {
  const { teams, headerTeam } = state.TeamsReducer
  const { countries } = state.CountriesReducer

  return  { teams, headerTeam, countries }
}

const mapDispatchToProps = {
  addTeam,
  editTeam,
  removeTeam,
  refreshMatch
}

export default  connect(mapStateToProps, mapDispatchToProps)(Teams)



