import React, { Component } from 'react';

import RowComponent from './RowComponent';

import MyContext from './context/myContext'

 const TableComponent = (props) => {

    return (
        <MyContext.Consumer>
            {context => {

                let { newState, handleChange, clickAction } = context

                    

                let { inputFilter, characters, isUsingRing, thisUseId, placeholder} = newState

                let filtered =  characters

                if(filtered){
                    filtered = characters.filter(ff => {
                        return ff.name.toLowerCase().includes(inputFilter.toLowerCase()) | ff.race.toLowerCase().includes(inputFilter.toLowerCase())
                    })
                }

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
            )}
        }
        </MyContext.Consumer>
    )
}

export default TableComponent