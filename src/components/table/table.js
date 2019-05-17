import React from 'react'

const Table = ({ list = [], headers = [], forms, action }) => {

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
                { action === "position" ? (<>
                    <button onClick={ () => { forms.onOpenModal("edit", lst) } }>Editar Equipo</button>
                    <button className={ `${list.length <= 2 ? "d-none": "" }` } onClick={ () => { forms.onOpenModal("delete", lst) } }>Eliminar Equipo</button>
                  </>)
                  :(
                  <button className={ `${lst.win >= 0 ? "d-none": "" }` } onClick={ () => { forms.onOpenModalMatch( lst, indLst ) } } >Jugar Partido</button>)
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