import React, { Component } from 'react';
import ActionComponent from './ActionComponent'

const RowComponent = (props) => {

  let {name, race, age, weapon, usingRing, killMe} = props.char
  let { idActual, isUsingRing, clickAction } = props

  return (
      <tr className={`character-row `}>
        <td className={`${killMe? "disabled": ""} ${usingRing? "married": ""}`}>{name}</td>
        <td className={`${killMe? "disabled": ""} ${usingRing? "married": ""}`}>{race}</td>
        <td className={`${killMe? "disabled": ""} ${usingRing? "married": ""}`}>{age}</td>
        <td className={`${killMe? "disabled": ""} ${usingRing? "married": ""}`}>{weapon}</td>
        <td>
          <ActionComponent isUsingRing={ isUsingRing } idActual={idActual} clickAction={clickAction} usingRing={usingRing} killMe={killMe}/>
        </td>
      </tr>
    )
}
export default RowComponent
