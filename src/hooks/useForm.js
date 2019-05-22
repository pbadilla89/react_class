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

    if( validate() ){
      setValues({
        ...values,
        is_valid: true,
        openModal: false
      })

      if(values.action === "add" && typeof actions.add != "undefined"){
        actions.add(values)
      } else if(values.action === "edit" && typeof actions.edit != "undefined") {
        actions.edit(values)
      } else if(values.action === "delete" && typeof actions.delete != "undefined") {
        actions.delete(values)
      }
    } else {
      setValues({
        ...values,
        is_valid: false
      })
    }
  }

  const onOpenModal = ( action, lst ) => {

    let { fields, modal_input  } = values

    let forState = {}

    for(let fi = 0; fi < fields.length; fi++){
      forState[fields[fi]] = typeof lst != "undefined" ? lst[fields[fi]] : ""
    }

    
    for(let fi = 0; fi < modal_input.length; fi++){
      let mi = modal_input[fi]
      if (mi["type"] === "select"){
        mi["option"] = values[mi["list"]]
      }
    }

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
      not_valid += values[fields[fi]] !== "" ? 0 : 1
    }

    if( values.action !== "delete" && not_valid === 0 ){
      is_valid = true
    } else if( values.action === "delete"){
      is_valid = true
    }

    return is_valid
  }

  return {
    values,
    handleInputChange,
    save,
    onOpenModal,
    onCloseModal
  }
}

export default useForm
