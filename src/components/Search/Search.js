import React, { useState } from 'react';
import { SearchContainer, SearchInput, SearchButton, SearchDropdown, SearchOptions, SearchOption, SearchOptionTitle } from './Search.elements'

function Search({ searchPlaceholder, submit }) {
    const [chordValue, setChordValue] = useState('')
    const [searchType, setSearchType] = useState('chord')
    const handleChange = (e) => {
        console.log(e)
    }
    return (
        <SearchContainer>
            <SearchInput placeholder={searchPlaceholder} onChange={(e) => setChordValue(e.target.value)} value={chordValue} />
            <SearchOptions>

                <SearchOption>
                    <SearchOptionTitle>Search by:</SearchOptionTitle>
                    <SearchDropdown value={searchType} onChange={handleChange}>
                        <option defaultValue value="chord">chord</option>
                        <option value="name">name</option>
                        <option value="type">type</option>
                    </SearchDropdown>
                </SearchOption>

                <SearchOption>
                    <SearchOptionTitle>Sort by:</SearchOptionTitle>
                    <SearchDropdown>
                        <option>chord</option>
                        <option>name</option>
                        <option>type</option>
                    </SearchDropdown>
                </SearchOption>

            </SearchOptions>
            <SearchButton onClick={() => {
                console.log("SENDING: ", chordValue, searchType)
                submit(chordValue, searchType)
                setChordValue('')
            }}>
                <span role="img" aria-label="icon">🔍</span>
            </SearchButton>
        </SearchContainer>
    )
}



export default Search
