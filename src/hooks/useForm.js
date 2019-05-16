import { useState } from 'react'

const useForm = (initialValues, cb = () => {}) => {
  const [values, setValues] = useState(initialValues)

  const handleInputChange = event => {
    const id = event.target.id
    const value = event.target.value

    setValues({
      ...values,
      [id]: value
    })
  }

  const saveTeam = event => {
    event.preventDefault()
    cb(values)
  }

  const onOpenModal = () => {
    setValues({
      ...values,
      openModal: true
    })
  }
 
  const onCloseModal = () => {
    setValues({
      ...values,
      openModal: false
    })
  }

  return {
    values,
    handleInputChange,
    saveTeam,
    onOpenModal,
    onCloseModal
  }
}

export default useForm
