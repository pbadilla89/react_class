import React from 'react';
import Modal from 'react-responsive-modal';

const ModalOption = ({ forms, title }) => {
   
    let { values, onCloseModal, save } = forms

    let options = typeof values.lst != "undefined" ? values.lst.options : []
    
    return (
        <Modal open={values.openModal} onClose={onCloseModal} center>
            <div className="modal-header">
                <h2> { title } </h2>
            </div>
            <div className="modal-body">
                <div className="">
                    <div className="btn-group d-flex" role="group">
                        {
                            options.map ( ( opt ) => {
                                return (
                                    <button key={ opt.id } className="btn btn-secondary w-100" onClick={ () => { save( opt.value ) } }> { opt.label }</button>
                                )
                            } )
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default ModalOption