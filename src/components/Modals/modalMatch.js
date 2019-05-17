import React from 'react';
import Modal from 'react-responsive-modal';

const ModalMatch = ({ forms }) => {
   
    let { values, onCloseModalMatch, saveMatch } = forms
    
    return (
        <Modal open={values.openModalMatch} onClose={onCloseModalMatch} center>
            <div className="modal-header">
                <h2>Jugar Partido</h2>
            </div>
            <div className="modal-body">
                <div className="">
                    <div className="btn-group d-flex" role="group">
                        <button className="btn btn-secondary w-100" onClick={ () => { saveMatch("idHome") } }>Gana { values.home }</button>
                        <button className="btn btn-secondary w-100" onClick={ () => { saveMatch("none") } }>Empatan</button>
                        <button className="btn btn-secondary w-100" onClick={ () => { saveMatch("idAway") } }>Gana { values.away }</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default ModalMatch