import { useState } from 'react'

const useMatch = (initialValues, cb = () => {}) => {
  const [values, setValues] = useState(initialValues)

  const saveMatch = whoWin => {
    cb(values, whoWin)
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
 
  const onCloseModalMatch = () => {
    setValues({
      ...values,
      openModalMatch: false
    })
  }

  return {
    values,
    saveMatch,
    onOpenModalMatch,
    onCloseModalMatch
  }
}

export default useMatch
