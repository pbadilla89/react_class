import React from 'react';
import Modal from 'react-responsive-modal';

const ModalTeam = ({ forms }) => {


    let { values, onCloseModal, handleInputChange, validate } = forms

    return (
        <>
            <Modal open={values.openModal} onClose={onCloseModal} center>
                <div className="modal-body">
                    <h2> { values.action === "add" ? "Agregar" : values.action === "edit" ? "Editar" : "Eliminar" } Equipo</h2>
                    {
                        values.action !== "delete" ? ( <>
                            <div className="form-row">
                                <div className="col-md-4 mb-3">
                                    <label >Nombre</label>
                                    <input 
                                        className="form-control"
                                        value={values.name}
                                        onChange={(e) => { handleInputChange(e.target.value,"name") }} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label >Pais</label>
                                    <select
                                        className="form-control"
                                        value={values.country}
                                        onChange={(e) => { handleInputChange(e.target.value,"country") }} >
                                        <option value=""> Seleccione </option>
                                        { values.countries.map( (cntr) => {
                                            return (
                                                <option key={cntr.id} value={cntr.id}> {cntr.name} </option>
                                            )
                                        } ) }
                                        
                                    </select>
                                </div>
                            </div></>
                         ) : (
                            <div className="">
                                <div className="" > ¿ Esta seguro de que quiere Eliminar el Equipo ? </div>
                            </div>
                         )
                    }
                    {
                        !values.is_valid ? (<div className="alert alert-danger" > Faltan ingresar campos </div>) : ""
                    }
                </div>
                <div className="modal-footer">
                    <button className="btn" onClick={ () => { 
                        validate()
                        }}>{ values.action === "add" ? "Agregar" : values.action === "edit" ? "Editar" : "Eliminar" } Equipo</button>

                    <button className="btn" onClick={ () => {
                        onCloseModal()
                        }}> Cancelar </button> 
                </div>
            </Modal>
        </>
    )
}
export default ModalTeam