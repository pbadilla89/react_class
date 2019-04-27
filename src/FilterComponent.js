import React from 'react';

const FilterComponent = props => {
    const { val, handleChange, placeholder } = props

    return (
        <div className="search-input">
            <input type="text" placeholder={placeholder} value={val} onChange={handleChange} />
        </div>
    )
}
export default FilterComponent

