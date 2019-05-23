import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Table = ({ list = [], headers = [], forms = {}, action, minList = 0, relation = "", relation2 = "", fix = 0 }) => {

  let { onOpenModal } = forms

  return (
    <table className="table">
      <thead>
        <tr>
        { headers.map( (hdr, indHdr) => {
              return(<th key={indHdr} > { hdr.label } </th>)
            } )
          }
          <th >  </th>
        </tr>
      </thead>
      <tbody>
      { list.map( (lst, indLst) => {
          return (
            <tr key={lst.id} >
              { headers.map( (hdr, indHdr) => {
                  let classWin = lst.idHome === lst.win && hdr.id === "home" ? "winner": ""
                  classWin = lst.idAway === lst.win && hdr.id === "away" ? "winner": classWin

                  classWin = lst.win === "0" ? "tied" : classWin

                  return (<td key={indHdr} className={`${classWin} h4`} > 
                    { lst[hdr.id] } 
                    { relation === hdr.id && <p className="h6" > { lst[relation+"_next"] }  </p> }
                    { relation2 === hdr.id && <p className="h6" > { lst[relation2+"_next"] }  </p> }
                    </td>)
                } )
              }
              <td > 
                { action === "form" ? (
                  <div className="btn-group d-flex" role="group">
                    <button className={ `btn btn-warning w-100` } onClick={ () => { onOpenModal("edit", lst) } }> <FontAwesomeIcon icon={["fas", "pencil-alt"]} /> </button>
                    <button className={ `btn btn-danger w-100 ${list.length <= minList ? "d-none": indLst < fix ? "d-none" : "" }` } onClick={ () => { onOpenModal("delete", lst) } }> <FontAwesomeIcon icon={["far", "trash-alt"]} /> </button>
                  </div>)
                  : action === "Mathes" ? (
                  <button className={ `btn btn-info ${lst.win >= 0 ? "d-none": "" }` } onClick={ () => { onOpenModal( lst, indLst ) } } > <FontAwesomeIcon icon={["fas", "gamepad"]} /> </button>)
                  : ""
                }
              </td>
            </tr>
          )
        } )
        }
      </tbody>
    </table>
  )
}

export default Table