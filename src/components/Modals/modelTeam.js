import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

import useForm from '../../hooks/useForm'

const formState = {
    openModal: false,
    name: "",
    country: ""
}

const ModalTeam = () => {
   
    const { values, onOpenModal, onCloseModal, handleInputChange, saveTeam } = useForm(formState);
    return (
        <>
            <button onClick={onOpenModal}>Agregar Equipo</button>
            <Modal open={values.openModal} onClose={onCloseModal} center>
                <div className="modal-body">
                    <h2>Crear Nuevo Equipo</h2>
                    <div className="">
                        <div className="" >Nombre</div>
                        <div className="" >
                            <input value={values.name} id="name" onChange={handleInputChange} />
                        </div>
                    </div>
                    <br />
                    <div className="">
                        <div className="" >Pais</div>
                        <div className="" >
                            <input value={values.country} id="country" onChange={handleInputChange} />
                        </div>
                    </div>
                    <br />
                </div>
                <div className="modal-footer">
                    <button onClick={saveTeam}>Guardar Equipo</button>
                </div>
            </Modal>
        </>
    )
}
export default ModalTeam