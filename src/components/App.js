import React from 'react';

import './App.css';

import { connect } from 'react-redux'
import { addTeam } from '../redux/all/teams'

import ModalTeam from './Modals/modelTeam'



const App = (props) => {

  console.log(props)

  const { } = props

  return (
    <div className="container">
        <ModalTeam/>
    </div>
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



