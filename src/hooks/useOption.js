import { useState } from 'react'

const useOption = (initialValues, cb = () => {}) => {
  const [values, setValues] = useState(initialValues)

  const save = whoWin => {
    cb(values, whoWin)
    onCloseModal()
  }

  const onOpenModal = ( lst, indLst ) => {
    console.log(lst)
    setValues({
      ...values,
      openModal: true,
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
