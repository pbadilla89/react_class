import { useState } from 'react'

const useForm = (initialValues, actions = {}) => {
  const [values, setValues] = useState(initialValues)

  const handleInputChange = (value, id) => {

    setValues({
      ...values,
      [id]: value
    })
  }

  const save = props => {
    let openModal = true
    let is_valid = false

    if( validate() ){

      console.log(values)
      
      if(values.action !== "login" && values.action !== "register"){
        if(values.action === "add" && typeof actions.add != "undefined"){
          actions.add(values)
          is_valid = true
          openModal = false
        } else if(values.action === "edit" && typeof actions.edit != "undefined") {
          actions.edit(values)
          is_valid = true
          openModal = false
        } else if(values.action === "delete" && typeof actions.delete != "undefined") {
          actions.delete(values)
          is_valid = true
          openModal = false
        }

        setValues({
          ...values,
          is_valid,
          openModal
        })
      } else if(values.action === "login" && typeof actions.login != "undefined") {
        actions.login(values)
        is_valid = true
        setValues({
          ...values,
          is_valid
        })
      } else if(values.action === "register" && typeof actions.register != "undefined") {
        actions.register(values)
      }
    } else {
      setValues({
        ...values,
        is_valid,
        openModal
      })
    }
  }

  const save2 = props => {
    let openModal = true
    let is_valid2 = false

    if( validate2() ){
      
      if(values.action2 !== "login" && values.action2 !== "register"){
        if(values.action2 === "add" && typeof actions.add != "undefined"){
          actions.add(values)
          is_valid2 = true
          openModal = false
        } else if(values.action2 === "edit" && typeof actions.edit != "undefined") {
          actions.edit(values)
          is_valid2 = true
          openModal = false
        } else if(values.action2 === "delete" && typeof actions.delete != "undefined") {
          actions.delete(values)
          is_valid2 = true
          openModal = false
        }

        setValues({
          ...values,
          is_valid2,
          openModal
        })
      } else if(values.action2 === "login" && typeof actions.login != "undefined") {
        actions.login(values)
        is_valid2 = true
        setValues({
          ...values,
          is_valid2
        })
      } else if(values.action2 === "register" && typeof actions.register != "undefined") {
        actions.register(values)
      }
    } else {
      setValues({
        ...values,
        is_valid2,
        openModal
      })
    }
  }

  const onOpenModal = ( action, lst ) => {

    let { fields, modal_input  } = values

    let forState = {}

    for(let fi = 0; fi < fields.length; fi++){
      forState[fields[fi]] = typeof lst != "undefined" ? lst[fields[fi]] : ""
    }

    console.log(modal_input)

    setValues({
      ...values,
      lst,
      ...forState,
      openModal: true,
      action,
      modal_input
    })
  }
 
  const onCloseModal = () => {
    setValues({
      ...values,
      openModal: false
    })
  }

  const validate = () => {
    let is_valid = false

    let { fields  } = values

    let not_valid = 0

    for(let fi = 0; fi < fields.length; fi++){

      const regex =  /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/

      if( fields[fi] === "email" ){
        const validEmail = regex.test(values[fields[fi]])
        not_valid += validEmail ? 0 : 1

        if(!validEmail){
          alert("Email invalido")
        }
      } else {
        not_valid += values[fields[fi]] !== "" ? 0 : 1
      }
    }

    if( values.action !== "delete" && not_valid === 0 ){
      is_valid = true
    } else if( values.action === "delete"){
      is_valid = true
    }

    return is_valid
  }

  const validate2 = () => {
    let is_valid = false

    let { fields2  } = values

    let not_valid = 0

    for(let fi = 0; fi < fields2.length; fi++){
      const regex =  /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/

      if( fields2[fi] === "email2" ){
        const validEmail = regex.test(values[fields2[fi]])
        not_valid += validEmail ? 0 : 1

        if(!validEmail){
          alert("Email invalido")
        }
      } else {
        not_valid += values[fields2[fi]] !== "" ? 0 : 1
      }
    }

    if( values.action2 !== "delete" && not_valid === 0 ){
      is_valid = true
    } else if( values.action2 === "delete"){
      is_valid = true
    }

    return is_valid
  }

  return {
    values,
    handleInputChange,
    save,
    save2,
    onOpenModal,
    onCloseModal
  }
}

export default useForm
