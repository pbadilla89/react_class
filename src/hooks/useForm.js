import { useState } from 'react'

const useForm = (initialValues, cb = () => {}, cb2 = null, cb3 = null, cb4 = null) => {
  const [values, setValues] = useState(initialValues)

  const handleInputChange = event => {
    const id = event.target.id
    const value = event.target.value

    setValues({
      ...values,
      [id]: value
    })
  }

  const save = props => {
    if(values.action === "add"){
      cb(values)
    } else if(values.action === "edit") {
      cb2(values)
    } else if(values.action === "delete") {
      cb3(values)
    } 
    
  }

  const onOpenModal = ( action, lst ) => {

    let { name, country  } = values

    if( typeof lst != "undefined" ){
      name = lst.name
      country = lst.country
    } else {
      name = ""
      country = ""
    }

    setValues({
      ...values,
      name,
      lst,
      country,
      openModal: true,
      action
    })
  }
 
  const onCloseModal = () => {
    setValues({
      ...values,
      openModal: false
    })
  }

  const saveMatch = props => {
    cb4(values, props)
    onCloseModalMatch()
  }

  const onOpenModalMatch = ( lst, indLst ) => {
    setValues({
      ...values,
      openModalMatch: true,
      lst,
      indLst,
      home: lst.home,
      away: lst.away
    })
  }
 
  const onCloseModalMatch = props => {
    setValues({
      ...values,
      openModalMatch: false
    })
  }

  const validate = () => {

    if( values.action !== "delete" && values.name !== "" && values.country !== "" ){
      save()
      
      setValues({
        ...values,
        is_valid: true,
        openModal: false
      })

  } else if( values.action === "delete"){
        save()
        
        setValues({
          ...values,
          is_valid: true,
          openModal: false
        })
    } else {
        
      setValues({
        ...values,
        is_valid: false
      })
    }
  }

  return {
    values,
    handleInputChange,
    save,
    onOpenModal,
    onCloseModal,
    saveMatch,
    onOpenModalMatch,
    onCloseModalMatch,
    validate
  }
}

export default useForm
