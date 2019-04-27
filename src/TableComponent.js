import React, { Component } from 'react';

import RowComponent from './RowComponent';

 class TableComponent extends Component {

    
    constructor(props){
        super(props)

        this.state = {
            useRing: false
        }

        this.changeRing = this.changeRing.bind(this)
    }

    changeRing(use){
        this.setState({
            useRing: use
        })
    }

    render(){
        let {characters} = this.props
        return (
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
                        <RowComponent key={key} name={char.name} race={char.race} age={char.age} weapon={char.weapon} useRing={this.state.useRing} changeRing={this.changeRing}/>
                    )
                    })
                }
                </tbody>
            </table>
        )
    }
}

export default TableComponent