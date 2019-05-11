const CLICK_ACTION = 'CLICK_ACTION'
const HANDLE_CHANGE = 'HANDLE_CHANGE'

const initialState = {
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


export const clickAction = (act, idActual) => {
    return ({
        type: CLICK_ACTION,
        payload: {
            act, idActual
        }
    })
}

export const handleChange = (e) => {
  console.log(e.target.value)
    return ({
        type: HANDLE_CHANGE,
        payload: {
            inputFilter: e.target.value
        }
    })
}





export default (newState = initialState, action) => {
  switch (action.type) {
    case CLICK_ACTION:

    const { act, idActual } = action.payload

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

    return {
        ...newState,
        ...changeState
    }

    case HANDLE_CHANGE:
      const { inputFilter } = action.payload

      return {
          ...newState,
          inputFilter
      }

    default: return newState
  }
}

