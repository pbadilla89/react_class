import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Table = ({ list = [], headers = [], forms, action, minList = 1 }) => {

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
                  let classWin = lst.idHome === lst.win && hdr.id == "home" ? "winner": ""
                  classWin = lst.idAway === lst.win && hdr.id == "away" ? "winner": classWin

                  classWin = lst.win === "0" ? "tied" : classWin

                  return (<td key={indHdr} className={classWin} > { lst[hdr.id] } </td>)
                } )
              }
              <td > 
                { action === "position" ? (
                  <div className="btn-group d-flex" role="group">
                    <button className={ `btn btn-warning w-100` } onClick={ () => { forms.onOpenModal("edit", lst) } }> <FontAwesomeIcon icon={["fas", "pencil-alt"]} /> </button>
                    <button className={ `btn btn-danger w-100 ${list.length <= minList ? "d-none": "" }` } onClick={ () => { forms.onOpenModal("delete", lst) } }> <FontAwesomeIcon icon={["far", "trash-alt"]} /> </button>
                  </div>)
                  :(
                  <button className={ `btn btn-info ${lst.win >= 0 ? "d-none": "" }` } onClick={ () => { forms.onOpenModalMatch( lst, indLst ) } } >Jugar Partido</button>)
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