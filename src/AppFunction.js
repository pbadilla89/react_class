import React, { Component } from 'react';
import './App.css';
import TableComponent from './TableComponent';
import FilterComponent from './FilterComponent';

import useCharacter from './hooks/useCharacter'

const AppFunction = () => {
    let myState = {
        inputFilter: "",
        placeholder: "search Name y/o Race",
        characters: [
        { name: 'Gandalf', race: 'Maia', age: '2019', weapon: 'Staff 🏑' },
        { name: 'Aragorn', race: 'Human', age: '120', weapon: 'Sword ⚔' },
        { name: 'Legolas', race: 'Elf', age: '200', weapon: 'Bow 🏹' },
        { name: 'Gimli', race: 'Dwarf', age: '139', weapon: 'Axe ⚒' },
        { name: 'Frodo', race: 'Hobbit', age: '33', weapon: 'Dagger 🗡' }
        ],
        isUsingRing: false,
        thisUseId: -1
    }

    let { newState, handleChange, clickAction } = useCharacter(myState)

    

    let { inputFilter, characters, isUsingRing, thisUseId, placeholder} = newState

    console.log(characters)
    let filtered =  characters

    if(filtered){
      filtered = characters.filter(ff => {
        return ff.name.toLowerCase().includes(inputFilter.toLowerCase()) | ff.race.toLowerCase().includes(inputFilter.toLowerCase())
      })
    }

    return (
      <div className="index">
        <h2>Fellowship of the Ring</h2>
  
        <div className="container">
          <FilterComponent val={inputFilter} handleChange={handleChange} placeholder={placeholder}/>
          {filtered.length > 0 && <TableComponent characters={filtered} isUsingRing={isUsingRing} thisUseId={thisUseId} clickAction={clickAction}/>}
          {filtered.length === 0 && <div>No Hay Registros</div>}
        </div>
      </div>
    )
}

export default AppFunction
