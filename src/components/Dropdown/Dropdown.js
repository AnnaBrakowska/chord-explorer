import React from 'react'
import { DropdownContainer, DropdownTitle, DropdownSelect } from './Dropdown.elements'

function Dropdown({ options, title, handler, value }) {
    return (
        <DropdownContainer>
            <DropdownTitle>{title}</DropdownTitle>
            <DropdownSelect value={value} onChange={(e) => handler(e.target.value)}>
                {options && options.map((el, i) => {
                    return <option key={i} value={el}>{el}</option>
                })
                }
            </DropdownSelect>
        </DropdownContainer>
    )
}

export default Dropdown
