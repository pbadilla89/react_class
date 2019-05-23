import React from 'react';

import { connect } from 'react-redux'
import { addLeague, editLeague, removeLeague } from '../../redux/Leagues'

import ModalForm from '../../components/Modals/modalForm'

import Table from '../../components/Table'

import useForm from '../../hooks/useForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let formState = {
  openModal: false,
  name: "",
  country: "",
  fields: ["name","country"],
  action: "add",
  is_valid: true,
  modal_input: [
    { label: "Name", type: "input", id: "name" },
    { label: "Country", type: "select", id: "country", list: "countries", option: [] }
  ]
}

const Leagues = (props) => {

  const { addLeague, editLeague, removeLeague, leagues, headerLeague, countries } = props

  formState = {
    ...formState,
    countries
  }

  const { values, onOpenModal, onCloseModal, handleInputChange, save } = useForm(formState, {add: addLeague, edit: editLeague, delete: removeLeague});



  return (
    <>
      <div className="col-6 offset-3 mb-3 mt-3">
        <div className="btn-group d-flex" role="group">
          <button className="btn btn-primary" onClick={ () => { onOpenModal("add") } }> <FontAwesomeIcon icon={["fas", "plus"]} /></button>
        </div>
      </div>
      
      <ModalForm forms={{ values, onCloseModal, handleInputChange, save }} title="League" />

      <div className="container">
        <label className="form-control"> Leagues </label>
        <Table list={leagues} headers={headerLeague} minList={1} action="form" forms={{ values, onOpenModal, onCloseModal, handleInputChange, save }} />
      </div>

    </>
  );
}

const mapStateToProps = state => {
  let { leagues, headerLeague } = state.LeaguesReducer
  const { countries } = state.CountriesReducer

  leagues = leagues.map( ( leg ) => {
    const country= countries.filter( ( coun ) => coun.id === leg.country )[0]

    return { 
      ...leg,
      country_name: country["name"] }
  } )

  return  { leagues, headerLeague, countries }
}

const mapDispatchToProps = {
  addLeague,
  editLeague,
  removeLeague
}

export default  connect(mapStateToProps, mapDispatchToProps)(Leagues)



