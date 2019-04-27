import React, { Component } from 'react';
import ActionComponent from './ActionComponent'

class RowComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      killMe: false,
      ringMe: false
    }

    this.changeKilled = this.changeKilled.bind(this)
    this.clickAction = this.clickAction.bind(this)
  }

  changeKilled (kill){
    this.setState({
      killMe: kill
    })
  }

  clickAction (act) {
    if(act === "ring"){
      this.props.changeRing(true)
      this.setState({
        ringMe: true
      })
    }
    if(act === "kill"){
      this.setState({
        killMe: true
      })
    }

  }

  render(){
    let {name, race, age, weapon, useRing} = this.props
    return (
        <tr className={`character-row ${this.state.killMe? "disabled": ""} ${this.state.ringMe? "married": ""}`}>
          <td>{name}</td>
          <td>{race}</td>
          <td>{age}</td>
          <td>{weapon}</td>
          <td>
            <ActionComponent useRing={ useRing } clickAction={this.clickAction} ringMe={this.state.ringMe}/>
          </td>
        </tr>
      )
    }
}
export default RowComponent
