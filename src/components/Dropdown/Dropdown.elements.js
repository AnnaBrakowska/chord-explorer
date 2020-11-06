import styled from 'styled-components'

export const DropdownTitle = styled.p``

export const DropdownContainer = styled.div`
    display: flex;
`

export const DropdownSelect = styled.select`
    width: 100px;
    border-radius: 5px;
    border: 1px solid lightgray;
    &:focus {
        outline: none;
        border: 1px solid orange;
    }
`