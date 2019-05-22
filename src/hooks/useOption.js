import { useState } from 'react'

const useOption = (initialValues, cb = () => {}) => {
  const [values, setValues] = useState(initialValues)

  const save = whoWin => {
    cb(values, whoWin)
    onCloseModal()
  }

  const onOpenModal = ( lst, indLst ) => {
    setValues({
      ...values,
      openModal: true,
      indLst,
      lst
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
    save,
    onOpenModal,
    onCloseModal
  }
}

export default useOption
