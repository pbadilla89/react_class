import React, { Component } from 'react';
import './App.css';
import TableComponent from './TableComponent';
import FilterComponent from './FilterComponent';

class App extends Component {

  constructor (props){
    super(props)

    this.state = {
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

    this.handleChange =  this.handleChange.bind(this)
    this.clickAction = this.clickAction.bind(this)
  }

  componentDidMount(){
    let { characters } = this.state
    this.setState({
      characters: characters.map( (char) => { return {...char, usingRing: false, killMe: false} } )
    })
    
  }

  handleChange (e){
    this.setState({
      inputFilter: e.target.value
    })
  }


  clickAction (act, idActual) {
    let { characters } = this.state
    console.log(idActual)
    if(act === "ring"){
      this.setState({
        characters: characters.map( (char, indChar) => { return {...char, usingRing: (indChar === idActual)} } ),
        thisUseId: idActual,
        isUsingRing: true
      })
    }
    if(act === "kill"){
      this.setState({
        characters: characters.map( (char, indChar) => {
          let { killMe } = char 
          return {...char, killMe: (indChar === idActual)? true: killMe} } )
      })
    }
    if(act === "revive"){
      this.setState({
        characters: characters.map( (char, indChar) => {
          let { killMe } = char 
          return {...char, killMe: (indChar === idActual ? false: killMe)} } )
      })
    }
    if(act === "giveBack"){
      let { thisUseId } = this.state
      if( thisUseId >= 0 ){
        this.setState({
          characters: characters.map( (char, indChar) => { 
            let { usR } = char 
            return {...char, usingRing: (indChar === thisUseId)?false: usR} } ),
          isUsingRing: false
        })
      }
    }

}

  render () {

    let { inputFilter, characters, isUsingRing, thisUseId} = this.state

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
          <FilterComponent val={this.state.inputFilter} handleChange={this.handleChange} placeholder={this.state.placeholder}/>
          {filtered.length > 0 && <TableComponent characters={filtered} isUsingRing={isUsingRing} thisUseId={thisUseId} clickAction={this.clickAction}/>}
          {filtered.length === 0 && <div>No Hay Registros</div>}
        </div>
      </div>
    )
  }
}

export default App
