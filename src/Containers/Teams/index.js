import React from 'react';

import { connect } from 'react-redux'
import { addTeam, editTeam, removeTeam } from '../../redux/Teams'

import ModalTeam from '../../components/Modals/modalTeam'

import Table from '../../components/Table'

import useForm from '../../hooks/useForm'

const formState = {
  openModal: false,
  name: "",
  country: "",
  action: "add",
  is_valid: true
}

const Teams = (props) => {

  const { addTeam, editTeam, removeTeam, teams, headerTeam} = props

  const { values, onOpenModal, onCloseModal, handleInputChange, save, validate } = useForm(formState, addTeam, editTeam, removeTeam);

  return (
    <>
      <div className="container">
        <button className="btn btn-primary" onClick={ () => { onOpenModal("add") } }>Agregar Equipo</button>
        <ModalTeam forms={{ values, onCloseModal, handleInputChange, validate }} />
      </div>

      <div className="container">
        <label className="form-control"> Tabla de Posiciones </label>
        <Table list={teams} headers={headerTeam} action="position" forms={{ values, onOpenModal, onCloseModal, handleInputChange, save }} />
      </div>

    </>
  );
}

const mapStateToProps = state => {
  const { teams, headerTeam } = state.TeamsReducer

  return  { teams, headerTeam }
}

const mapDispatchToProps = {
  addTeam,
  editTeam,
  removeTeam
}

export default  connect(mapStateToProps, mapDispatchToProps)(Teams)



