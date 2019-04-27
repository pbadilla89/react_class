import React, { Component } from 'react';
import './App.css';
import TableComponent from './TableComponent';
import FilterComponent from './FilterComponent';

const characters = [
  { name: 'Gandalf', race: 'Maia', age: '2019', weapon: 'Staff 🏑' },
  { name: 'Aragorn', race: 'Human', age: '120', weapon: 'Sword ⚔' },
  { name: 'Legolas', race: 'Elf', age: '200', weapon: 'Bow 🏹' },
  { name: 'Gimli', race: 'Dwarf', age: '139', weapon: 'Axe ⚒' },
  { name: 'Frodo', race: 'Hobbit', age: '33', weapon: 'Dagger 🗡' }
]

class App extends Component {

  constructor (props){
    super(props)

    this.state = {
      inputFilter: "",
      placeholder: "search Name y/o Race"
    }

    this.handleChange =  this.handleChange.bind(this)
  }

  handleChange (e){
    this.setState({
      inputFilter: e.target.value
    })
  }

  render () {

    let {inputFilter} = this.state

    let filtered = characters

    if(filtered){
      filtered = characters.filter(ff => {
        return ff.name.toLowerCase().includes(inputFilter.toLowerCase()) | ff.race.toLowerCase().includes(inputFilter.toLowerCase())
      })
    }

    return (
      <div className="index">
        <h2>Fellowship of the Ring</h2>
  
        <div className="container">
          <FilterComponent val={this.state.inputFilter} handleChange={this.handleChange} placeholder={this.state.placeholder}/>
          {filtered.length > 0 && <TableComponent characters={filtered}/>}
          {filtered.length === 0 && <div>No Hay Registros</div>}
        </div>
      </div>
    )
  }
}

export default App
