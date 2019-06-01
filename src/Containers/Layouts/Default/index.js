import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import { loginUser } from '../../../redux/Users/thunks'

import ModalForm from '../../../components/Modals/modalForm'

import useForm from '../../../hooks/useForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let formState = {
  openModal: false,
  email: "",
  password: "",
  fields: ["email", "password"],
  action: "login",
  is_login: false,
  is_valid: true,
  modal_input: [
    { label: "Email", type: "input", id: "email" },
    { label: "Password", type: "input", id: "password" }
  ]
}

const LayoutDefault = (props) => {

  const { loginUser, children } = props

  let formState2 = { ...formState }

  if(!formState.is_login){
    formState2 = {
      ...formState,
      openModal: true
    }
  }

  const { values, onOpenModal, onCloseModal, handleInputChange, save } = useForm(formState2, {login: loginUser});


  return (
    <>      
      <ModalForm forms={{ values, onCloseModal, handleInputChange, save }} title="Login" />

      { values.is_login && children }

    </>
  );
}

const mapStateToProps = state => {
  return  state
}

const mapDispatchToProps = {
  loginUser
}

export default  connect(mapStateToProps, mapDispatchToProps)(LayoutDefault)



