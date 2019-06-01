import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import { editUser } from '../../redux/Users'
import { listUsers, saveUser, removeUser } from '../../redux/Users/thunks'

import ModalForm from '../../components/Modals/modalForm'

import Table from '../../components/Table'

import useForm from '../../hooks/useForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let formState = {
  openModal: false,
  name: "",
  lastname: "",
  email: "",
  role: "admin",
  password: "",
  fields: ["name","lastname","email", "password"],
  action: "add",
  is_valid: true,
  modal_input: [
    { label: "Name", type: "input", id: "name" },
    { label: "LastName", type: "input", id: "lastname" },
    { label: "Email", type: "input", id: "email" },
    { label: "Password", type: "input", id: "password" }
  ]
}

const Users = (props) => {

  const { saveUser, editUser, removeUser, users, headerUser, listUsers } = props

  const { values, onOpenModal, onCloseModal, handleInputChange, save } = useForm(formState, {add: saveUser, edit: editUser, delete: removeUser});

  useEffect(() => {
    listUsers()
  }, [])


  return (
    <>
      <div className="col-6 offset-3 mb-3 mt-3">
        <div className="btn-group d-flex" role="group">
          <button className="btn btn-primary" onClick={ () => { onOpenModal("add") } }> <FontAwesomeIcon icon={["fas", "plus"]} /></button>
        </div>
      </div>
      
      <ModalForm forms={{ values, onCloseModal, handleInputChange, save }} title="User" />

      <div className="container">
        <label className="form-control"> List Of Users </label>
        <Table list={users} headers={headerUser} minList={1} fix={1} action="form" forms={{ values, onOpenModal, onCloseModal, handleInputChange, save }} />
      </div>

    </>
  );
}

const mapStateToProps = state => {
  return  state.UsersReducer
}

const mapDispatchToProps = {
  saveUser,
  editUser,
  removeUser,
  listUsers
}

export default  connect(mapStateToProps, mapDispatchToProps)(Users)



