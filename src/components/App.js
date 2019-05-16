import React from 'react';

import './App.css';

import { connect } from 'react-redux'
import { addTeam } from '../redux/all/teams'

import ModalTeam from './Modals/modelTeam'

import Table from './table/table'



const App = (props) => {

  const { addTeam, TeamsReducer } = props

  let { teams, headers } =  TeamsReducer

  return (
    <>
      <div className="container">
          <ModalTeam addTeam={addTeam}/>
      </div>

      <div className="container">
        <label> Tabla de Posiciones </label>
        <Table list={teams} headers={headers} />
      </div>

      <div className="container">
        <label> Partidos </label>
        <Table list={teams} headers={headers} />
      </div>
    </>
  );
}

const mapStateToProps = state => {

  return {
    ...state
  }
}

const mapDispatchToProps = {
  addTeam
}

export default  connect(mapStateToProps, mapDispatchToProps)(App)



