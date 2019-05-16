import React from 'react'

const Table = ({ list = [], headers = [] }) => {

  return (
    <table className="table">
      <thead>
        <tr>
        { headers.map( (hdr, indHdr) => {
              return(<th key={indHdr} > { hdr.labelHead } </th>)
            } )
          }
        </tr>
      </thead>
      <tbody>
      { list.map( (lst) => {
          return (
            <tr key={lst.id} >
              { headers.map( (hdr, indHdr) => {
                  return (<td key={indHdr}> { lst[hdr.id] } </td>)
                } )
              }
            </tr>
          )
        } )
        }
      </tbody>
    </table>
  )
}

export default Table