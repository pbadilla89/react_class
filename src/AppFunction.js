import React, { Component } from 'react';
import './App.css';
import TableComponent from './TableComponent';
import FilterComponent from './FilterComponent';

import { clickAction, handleChange } from './redux/characters'

import { connect } from 'react-redux'

const AppFunction = (props) => {

    let { inputFilter, characters, placeholder, handleChange} = props

    
    return (
      <div className="index">
        <h2>Fellowship of the Ring</h2>
          <div className="container">
            <FilterComponent val={inputFilter} handleChange={handleChange} placeholder={placeholder}/>
            {characters.length > 0 && <TableComponent newState={props} />}
            {characters.length === 0 && <div>No Hay Registros</div>}
          </div>
      </div>
    )
}


const mapStateToProps = state => {

  let filtered =  [...state.characters]

    if(filtered){
        filtered = state.characters.filter(ff => {
            return ff.name.toLowerCase().includes(state.inputFilter.toLowerCase()) | ff.race.toLowerCase().includes(state.inputFilter.toLowerCase())
        })
    }

  return {
    ...state,
    characters:filtered
  }
}

const mapDispatchToProps = {
  clickAction,
  handleChange
}


export default  connect(mapStateToProps, mapDispatchToProps)(AppFunction)
