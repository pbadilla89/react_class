import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import { loginUser, registerUser, validateSession } from '../../../redux/Logs/thunks'
import { logOut, changeLoading } from '../../../redux/Logs'

import Menu from '../../../components/Menu'

import ModalForm from '../../../components/Modals/modalForm'

import useForm from '../../../hooks/useForm'

let formState = {
  email: "",
  password: "",
  email2: "",
  password2: "",
  name2: "",
  lastname2: "",
  fields: ["email", "password"],
  fields2: ["email2", "password2", "name2", "lastname2"],
  action: "login",
  action2: "register",
  is_valid: true,
  is_valid2: true,
  modal_input: [
    { label: "Email", type: "input", id: "email", inputType:"email" },
    { label: "Password", type: "input", id: "password", inputType:"password" }
  ],
  modal_input2: [
    { label: "Email", type: "input", id: "email2", inputType:"email" },
    { label: "Password", type: "input", id: "password2", inputType:"password" },
    { label: "Name", type: "input", id: "name2" },
    { label: "LastName", type: "input", id: "lastname2" }
  ]
}

const LayoutDefault = (props) => {

  const { loginUser, registerUser, children, isLogin, openModal, validateSession, logOut, is_loading, changeLoading } = props

  const { values, handleInputChange, save, save2 } = useForm(formState, {login: loginUser, register: registerUser});

  useEffect(()=>{
    validateSession(  )
  },[])

  return (
    <>
      { !is_loading && (<ModalForm forms={{ values, openModal, handleInputChange, save, save2 }} title="Login" title2="Register" />) }

      { !is_loading && isLogin && (<Menu logOut={logOut}/>) }
      { !is_loading && isLogin && children }

    </>
  );
}

const mapStateToProps = state => {
  return  state.LogsReducer
}

const mapDispatchToProps = {
  loginUser,
  registerUser,
  validateSession,
  logOut,
  changeLoading
}

export default  connect(mapStateToProps, mapDispatchToProps)(LayoutDefault)



