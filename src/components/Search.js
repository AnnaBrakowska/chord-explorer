import React, { useState } from 'react';
import styled from 'styled-components'

const Input = styled.input`
    padding: 20px;
    margin: 10px 0;

    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid lightgray;
`


const Button = styled.button`
    background-color: orange;
    top: 10px;
    padding: 15px 20px;
    color: white;
    border-radius: 50%;
    border: none;
    position: absolute;
    cursor: pointer;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px;
    }
`

function Search({ searchPlaceholder, setChordToFind }) {
    const [chordValue, setChordValue] = useState('')
    return (
        <>
            <Input placeholder={searchPlaceholder} onChange={(e) => setChordValue(e.target.value)} value={chordValue} />
            <Button onClick={() => {
                setChordToFind(chordValue)
                setChordValue('')
            }}>
                <span role="img" aria-label="icon">🔍</span>
            </Button>
        </>
    )
}



export default Search