import React from 'react';
import Modal from 'react-responsive-modal';

const ModalForm = ({ forms, title, title2, option }) => {


    let { values, openModal, onCloseModal, handleInputChange, save, save2 } = forms

    if (typeof onCloseModal === "undefined")  onCloseModal = () => {}

    return (
        <>
            <Modal open={ typeof openModal !== "undefined"? openModal : values.openModal} onClose={onCloseModal} center closeOnOverlayClick={false} showCloseIcon={false} >
                <div className="modal-body">
                    <div className={`col-${ typeof title2 != "undefined"? 6 : 12 }`} style={{ float: "left" }} >
                      <h2> { values.action === "add" ? "Add" : values.action === "edit" ? "Edit" : values.action === "delete"? "Delete": "" } {title}</h2>
                      {
                          values.action !== "delete" ? 
                                  values.modal_input.map( ( mi ) => {
                                      return (
                                          <div key={mi.id} className="form-row">
                                              <div className="col-10 offset-1">
                                                  <label > {mi.label} </label>
                                                  { mi.type === "input" && (
                                                      <input 
                                                      className="form-control"
                                                      value={values[mi["id"]]}
                                                      type={ typeof mi["inputType"] != "undefined" ? mi["inputType"] : "text" }
                                                      onChange={(e) => { handleInputChange( e.target.value, mi["id"] ) }} /> ) }
                                                  { mi.type === "select" && (
                                                      <select 
                                                          className="form-control"
                                                          value={values[mi["id"]]}
                                                          onChange={(e) => { handleInputChange( e.target.value, mi["id"] ) }} >
                                                          <option value=""> Select </option>
                                                          { typeof option[mi["list"]] != "undefined" && option[mi["list"]].length > 0 && option[mi["list"]].map( (opt) => {
                                                              return (
                                                                  <option key={opt._id} value={opt._id}> {opt.name} </option>
                                                              )
                                                          } ) }
                                                      </select> ) }
                                              </div>
                                          </div>
                                      )
                                  } )
                          : (
                              <div className="">
                                  <div className="" > Are you sure?, You're going to delete a {title} </div>
                              </div>
                          )
                      }
                      {
                          !values.is_valid ? (<div className="alert alert-danger" > You have empty or wrong fields </div>) : ""
                      }
                    </div>
                    { typeof title2 !== "undefined" && ( <div className="col-6" style={{ float: "left" }} >
                        <h2> { values.action2 === "add" ? "Add" : values.action2 === "edit" ? "Edit" : values.action2 === "delete"? "Delete": "" } {title2}</h2>
                        {
                            values.action2 !== "delete" ? 
                                    values.modal_input2.map( ( mi ) => {
                                        return (
                                            <div key={mi.id} className="form-row">
                                                <div className="col-10 offset-1">
                                                    <label > {mi.label} </label>
                                                    { mi.type === "input" && (
                                                        <input 
                                                        className="form-control"
                                                        value={values[mi["id"]]}
                                                        type={ typeof mi["inputType"] != "undefined" ? mi["inputType"] : "text" }
                                                        onChange={(e) => { handleInputChange( e.target.value, mi["id"] ) }} /> ) }
                                                    { mi.type === "select" && (
                                                        <select 
                                                            className="form-control"
                                                            value={values[mi["id"]]}
                                                            onChange={(e) => { handleInputChange( e.target.value, mi["id"] ) }} >
                                                            <option value=""> Select </option>
                                                            { mi.option.map( (opt) => {
                                                                return (
                                                                    <option key={opt._id} value={opt._id}> {opt.name} </option>
                                                                )
                                                            } ) }
                                                        </select> ) }
                                                </div>
                                            </div>
                                        )
                                    } )
                            : (
                                <div className="">
                                    <div className="" > Are you sure?, You're going to delete a {title} </div>
                                </div>
                            )
                        }
                        {
                            !values.is_valid2 ? (<div className="alert alert-danger" > You have empty or wrong fields </div>) : ""
                        }
                      </div> )
                    }
                </div>
                <div className="modal-footer">
                  <div className={`col-${ typeof title2 != "undefined"? 6 : 12 }`} style={{ float: "left" }} >
                    <button className="btn" onClick={ () => { 
                        save()
                        }}>{ values.action === "delete" ? "Delete" : values.action !== "login" ? values.action !== "register"? "Save " : "" : "" } {title} </button>

                    <button className={"btn "+(values.action === "login"? "d-none" : "")} onClick={ () => {
                        onCloseModal()
                        }}> Cancel </button> 
                  </div>
                  { typeof title2 !== "undefined" && ( <div className="col-6" style={{ float: "left" }} >
                    <button className="btn" onClick={ () => { 
                        save2()
                        }}>{ values.action2 === "delete" ? "Delete" : values.action2 !== "login" ? values.action2 !== "register"? "Save " : "" : "" } {title2} </button>
                        <button className={"btn "+(values.action2 === "login"? "d-none" : values.action2 === "register"? "d-none" : "")} onClick={ () => {
                        onCloseModal()
                        }}> Cancel </button> 
                    </div> )
                  }
                </div>
            </Modal>
        </>
    )
}
export default ModalForm