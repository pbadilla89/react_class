import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import { editTeam } from '../../redux/Teams'
import { saveTeam, listTeams, removeTeam } from '../../redux/Teams/thunks'

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

  const { addTeam, editTeam, removeTeam, teams, headerTeam, countries, leagues, listTeams } = props

  useEffect(() => {
    listTeams()
  }, [])

  formState = {
    ...formState,
    countries,
    leagues
  }

  const { values, onOpenModal, onCloseModal, handleInputChange, save } = useForm(formState, {add: addTeam, edit: editTeam, delete: removeTeam});



  return (
    <>
      <div className="col-6 offset-3 mb-3 mt-3">
        <div className="btn-group d-flex" role="group">
          <button className="btn btn-primary" onClick={ () => { onOpenModal("add") } }> <FontAwesomeIcon icon={["fas", "plus"]} /></button>
        </div>
      </div>
      
      <ModalForm forms={{ values, onCloseModal, handleInputChange, save }} title="Team" option={{countries, leagues}} />

      <div className="container">
        <label className="form-control"> List Of Teams </label>
        <Table list={teams} headers={headerTeam} minList={2} action="form" forms={{ values, onOpenModal, onCloseModal, handleInputChange, save }} />
      </div>

    </>
  );
}

const mapStateToProps = state => {
  let { teams, headerTeam, countries, leagues } = state.TeamsReducer

  teams = teams.map( ( tms ) => {

    return {
      ...tms,
      country_name: tms.country.name,
      league_name: tms.league.name
    }
  } )

  return  { teams, headerTeam, countries, leagues }
}

const mapDispatchToProps = {
  addTeam : saveTeam,
  editTeam,
  removeTeam,
  listTeams
}

export default  connect(mapStateToProps, mapDispatchToProps)(Teams)



