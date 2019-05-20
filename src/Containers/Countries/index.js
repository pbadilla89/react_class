import React from 'react';

import { connect } from 'react-redux'
import { addCountry, editCountry, removeCountry } from '../../redux/Countries'

import ModalCountry from '../../components/Modals/modalCountry'

import Table from '../../components/Table'

import useCountry from '../../hooks/useCountry'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const formState = {
  openModal: false,
  name: "",
  action: "add",
  is_valid: true
}

const Countries = (props) => {

  const { addCountry, editCountry, removeCountry, countries, headerCountry} = props

  const { values, onOpenModal, onCloseModal, handleInputChange, save, validate } = useCountry(formState, addCountry, editCountry, removeCountry);

  return (
    <>
      <div className="container">
        <button className="btn btn-primary w-100" onClick={ () => { onOpenModal("add") } }><FontAwesomeIcon icon={["fas", "plus"]} /> </button>
      </div>

      <div className="container">
        <ModalCountry forms={{ values, onCloseModal, handleInputChange, validate }} />
        <label className="form-control"> Tabla de Posiciones </label>
        <Table list={countries} headers={headerCountry} action="position" forms={{ values, onOpenModal, onCloseModal, handleInputChange, save }} />
      </div>

    </>
  );
}

const mapStateToProps = state => {
  const { countries, headerCountry } = state.CountriesReducer

  return  { countries, headerCountry }
}

const mapDispatchToProps = {
  addCountry,
  editCountry,
  removeCountry
}

export default  connect(mapStateToProps, mapDispatchToProps)(Countries)



