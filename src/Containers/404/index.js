import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Page404 = (props) => {

  return (
    <div className="container">
      <div className="row">
          <div className="col-md-12 text-center">
              <div className="error-template">
                  <h1> <FontAwesomeIcon icon={["fas","exclamation-circle"]}/> </h1>
                  <h2> 
                      Sorry, this page doesn`t exists
                  </h2>
              </div>
          </div>
      </div>
    </div>
  );
}

export default  Page404









