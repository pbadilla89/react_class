import React from 'react';
import Modal from 'react-responsive-modal';

const ModalTeam = ({ forms }) => {

    let { values, onCloseModal, handleInputChange, save } = forms

    return (
        <>
            <Modal open={values.openModal} onClose={onCloseModal} center>
                <div className="modal-body">
                    <h2> { values.action === "add" ? "Agregar" : values.action === "edit" ? "Editar" : "Eliminar" } Equipo</h2>
                    {
                        values.action !== "delete" ? ( <>
                            <div className="">
                                <div className="" >Nombre</div>
                                <div className="" >
                                    <input className="form-control" value={values.name} id="name" onChange={handleInputChange} />
                                </div>
                            </div>
                            <br />
                            <div className="">
                                <div className="" >Pais</div>
                                <div className="" >
                                    <input className="form-control" value={values.country} id="country" onChange={handleInputChange} />
                                </div>
                            </div>
                            <br /> </>
                         ) : (
                            <div className="">
                                <div className="" > ¿ Esta seguro de que quiere Eliminar el Equipo ? </div>
                            </div>
                         )
                    }
                    
                </div>
                <div className="modal-footer">
                    <button className="btn" onClick={ () => { 
                        save()
                        onCloseModal()
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