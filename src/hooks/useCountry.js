import { useState } from 'react'

const useCountry = (initialValues, cb = () => {}, cb2 = null, cb3 = null) => {
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

    let { name  } = values

    if( typeof lst != "undefined" ){
      name = lst.name
    } else {
      name = ""
    }

    setValues({
      ...values,
      name,
      lst,
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

  const validate = () => {

    if( values.action !== "delete" && values.name !== ""){
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
    validate
  }
}

export default useCountry
