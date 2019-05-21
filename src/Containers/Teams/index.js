import React from 'react';

import { connect } from 'react-redux'
import { addTeam, editTeam, removeTeam } from '../../redux/Teams'
import { refreshMatch } from '../../redux/Matches'

import ModalForm from '../../components/Modals/modalForm'

import Table from '../../components/Table'

import useForm from '../../hooks/useForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let formState = {
  openModal: false,
  name: "",
  country: "",
  league: "",
  fields: ["name","country", "league"],
  action: "add",
  is_valid: true,
  modal_input: [
    { label: "Name", type: "input", id: "name" },
    { label: "Country", type: "select", id: "country", list: "countries", option: [] },
    { label: "league", type: "select", id: "league", list: "leagues", option: [] }
  ]
}

const Teams = (props) => {

  const { addTeam, editTeam, removeTeam, teams, headerTeam, countries, leagues, refreshMatch} = props

  formState = {
    ...formState,
    countries,
    leagues
  }

  const { values, onOpenModal, onCloseModal, handleInputChange, save } = useForm(formState, {add: addTeam, edit: editTeam, delete: removeTeam});



  return (
    <>
      <div className="container">
        <div className="btn-group d-flex" role="group">
          <button className="btn btn-primary" onClick={ () => { onOpenModal("add") } }> <FontAwesomeIcon icon={["fas", "plus"]} /></button>
          <button className="btn btn-success" onClick={ () => { refreshMatch() } }> <FontAwesomeIcon icon={["fas", "sync-alt"]} /> </button>
        </div>
      </div>
      
      <ModalForm forms={{ values, onCloseModal, handleInputChange, save }} title="Team" />

      <div className="container">
        <label className="form-control"> Table </label>
        <Table list={teams} headers={headerTeam} relation={"name"} minList={2} action="position" forms={{ values, onOpenModal, onCloseModal, handleInputChange, save }} />
      </div>

    </>
  );
}

const mapStateToProps = state => {
  let { teams, headerTeam } = state.TeamsReducer
  const { countries } = state.CountriesReducer
  const { leagues } = state.LeaguesReducer

  teams = teams.map( ( tms ) => {

    return {
      ...tms,
      name_next: countries[countries.findIndex( (rl) => rl.id === tms["country"])]["name"]
    }
  } )

  return  { teams, headerTeam, countries, leagues }
}

const mapDispatchToProps = {
  addTeam,
  editTeam,
  removeTeam,
  refreshMatch
}

export default  connect(mapStateToProps, mapDispatchToProps)(Teams)



