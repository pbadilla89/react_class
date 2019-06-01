import React from 'react';
import Modal from 'react-responsive-modal';

const ModalForm = ({ forms, title }) => {


    let { values, onCloseModal, handleInputChange, save } = forms

    return (
        <>
            <Modal open={values.openModal} onClose={onCloseModal} center closeOnOverlayClick={false}>
                <div className="modal-body">
                    <h2> { values.action === "add" ? "Add" : values.action === "edit" ? "Edit" : values.action === "delete"? "Delete": "" } {title}</h2>
                    {
                        values.action !== "delete" ? 
                                values.modal_input.map( ( mi ) => {
                                    return (
                                        <div key={mi.id} className="form-row">
                                            <div className="col-md-4 mb-3">
                                                <label > {mi.label} </label>
                                                { mi.type === "input" && (
                                                    <input 
                                                    className="form-control"
                                                    value={values[mi["id"]]}
                                                    onChange={(e) => { handleInputChange( e.target.value, mi["id"] ) }} /> ) }
                                                { mi.type === "select" && (
                                                    <select 
                                                        className="form-control"
                                                        value={values[mi["id"]]}
                                                        onChange={(e) => { handleInputChange( e.target.value, mi["id"] ) }} >
                                                        <option value=""> Select </option>
                                                        { mi.option.map( (opt) => {
                                                            return (
                                                                <option key={opt.id} value={opt.id}> {opt.name} </option>
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
                        !values.is_valid ? (<div className="alert alert-danger" > You have empty fields </div>) : ""
                    }
                </div>
                <div className="modal-footer">
                    <button className="btn" onClick={ () => { 
                        save()
                        }}>{ values.action === "delete" ? "Delete" : "Save " } {title} </button>

                    <button className="btn" onClick={ () => {
                        onCloseModal()
                        }}> Cancel </button> 
                </div>
            </Modal>
        </>
    )
}
export default ModalForm