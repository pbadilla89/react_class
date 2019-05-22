import React from 'react';

import { connect } from 'react-redux'
import { addTeam, editTeam, removeTeam, changeActiveLeague } from '../../redux/Teams'
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

  const { addTeam, editTeam, removeTeam, teams2, headerTeam, countries, leagues, refreshMatch, activeLeague, changeActiveLeague} = props

  formState = {
    ...formState,
    countries,
    leagues
  }

  const { values, onOpenModal, onCloseModal, handleInputChange, save } = useForm(formState, {add: addTeam, edit: editTeam, delete: removeTeam});



  return (
    <>
      <div className="container mb-3 mt-3">
        <select className="form-control" value={ activeLeague } onChange={ (e) => { changeActiveLeague(e.target.value) }} >
          {
            leagues.map( ( leg, indLeg ) => {
              return ( <option key={indLeg} value={leg.id} > { leg.name } </option> )
            } )
          }
        </select>
      </div>

      <div className="col-6 offset-3 mb-3 mt-3">
        <div className="btn-group d-flex" role="group">
          <button className="btn btn-primary" onClick={ () => { onOpenModal("add") } }> <FontAwesomeIcon icon={["fas", "plus"]} /></button>
          <button className="btn btn-success" onClick={ () => { refreshMatch() } }> <FontAwesomeIcon icon={["fas", "sync-alt"]} /> </button>
        </div>
      </div>
      
      <ModalForm forms={{ values, onCloseModal, handleInputChange, save }} title="Team" />

      <div className="container">
        <label className="form-control"> Table </label>
        <Table list={teams2} headers={headerTeam} relation={"name"} minList={2} action="position" forms={{ values, onOpenModal, onCloseModal, handleInputChange, save }} />
      </div>

    </>
  );
}

const mapStateToProps = state => {
  let { teams, headerTeam, activeLeague } = state.TeamsReducer
  const { countries } = state.CountriesReducer
  const { leagues } = state.LeaguesReducer

  if( activeLeague === "" ){
    activeLeague = leagues[0]["id"]
  }

  let teams2 = teams.filter( ( tem ) => tem.league === activeLeague )

  teams2 = teams2.map( ( tms, incTms ) => {

    return {
      ...tms,
      pos: incTms+1,
      name_next: countries[countries.findIndex( (rl) => rl.id === tms["country"])]["name"]
    }
  } )

  return  { teams2, headerTeam, countries, activeLeague, leagues }
}

const mapDispatchToProps = {
  addTeam,
  editTeam,
  removeTeam,
  refreshMatch,
  changeActiveLeague
}

export default  connect(mapStateToProps, mapDispatchToProps)(Teams)



