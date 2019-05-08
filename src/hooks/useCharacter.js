import React, { useState } from 'react'

const useCharacter = (initialValues = {}) => {
  const [newState, setNewState] = useState(initialValues)

  const handleChange = (e) => {
    setNewState({
      ...newState,
      inputFilter: e.target.value
    })
  }

  const clickAction = (act, idActual) => {

    let changeState = { ...newState }

    let { characters } = changeState
    if(act === "ring"){
      changeState = {
        ...changeState,
        characters: characters.map( (char, indChar) => { return {...char, usingRing: (indChar === idActual)} } ),
        thisUseId: idActual,
        isUsingRing: true
      }
    }
    if(act === "kill"){
      changeState = {
        ...changeState,
        characters: characters.map( (char, indChar) => {
          let { killMe } = char 
          return {...char, killMe: (indChar === idActual)? true: killMe} } )
      }
    }
    if(act === "revive"){
      changeState = {
        ...changeState,
        characters: characters.map( (char, indChar) => {
          let { killMe } = char 
          return {...char, killMe: (indChar === idActual ? false: killMe)} } )
      }
    }
    if(act === "giveBack"){
      let { thisUseId } = changeState
      if( thisUseId >= 0 ){
        changeState = {
          ...changeState,
          characters: characters.map( (char, indChar) => { 
            let { usR } = char 
            return {...char, usingRing: (indChar === thisUseId)?false: usR} } ),
          isUsingRing: false
        }
      }
    }
    setNewState({
      ...newState,
      ...changeState
    })
}

  return { newState, handleChange, clickAction }
}

export default useCharacter
