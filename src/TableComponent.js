import React, { Component } from 'react';

import RowComponent from './RowComponent';

 const TableComponent = ( { newState } ) => {
                    

                let { inputFilter, characters, isUsingRing, thisUseId, placeholder, handleChange, clickAction} = newState

                return(
                <>
                <table className="characters-table">
                    <thead>
                        <tr className="character-row">
                            <th>Name</th>
                            <th>Race</th>
                            <th>Age</th>
                            <th>Weapon</th>
                            <th>Icon</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        characters.map((char, key) => {
                        return (
                            <RowComponent key={key} char={char} idActual={key} clickAction={clickAction} isUsingRing={isUsingRing}/>
                        )
                        })
                    }
                    </tbody>
                </table>
                <div onClick={(e) => { clickAction("giveBack") } }> Give Back Ring </div>
                </>
            )
        }


export default TableComponent