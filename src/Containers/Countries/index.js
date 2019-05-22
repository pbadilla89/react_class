import React from 'react';

import { connect } from 'react-redux'
import { addCountry, editCountry, removeCountry } from '../../redux/Countries'

import ModalForm from '../../components/Modals/modalForm'

import Table from '../../components/Table'

import useForm from '../../hooks/useForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const formState = {
  openModal: false,
  name: "",
  fields: ["name"],
  action: "add",
  is_valid: true,
  modal_input: [
    { label: "Name", type: "input", id: "name" }
  ]
}

const Countries = (props) => {

  const { addCountry, editCountry, removeCountry, countries, headerCountry} = props

  const { values, onOpenModal, onCloseModal, handleInputChange, save } = useForm(formState, {add: addCountry, edit: editCountry, delete: removeCountry});

  return (
    <>
      <div className="col-6 offset-3 mb-3 mt-3">
        <button className="btn btn-primary w-100" onClick={ () => { onOpenModal("add") } }><FontAwesomeIcon icon={["fas", "plus"]} /> </button>
      </div>

      <ModalForm forms={{ values, onCloseModal, handleInputChange, save }} title="Country" />

      <div className="container">
        <label className="form-control"> Countries </label>
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



