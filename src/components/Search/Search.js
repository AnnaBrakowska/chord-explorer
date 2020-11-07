import React from 'react';
import { SearchContainer, SearchInput, SearchButton } from './Search.elements'

function Search({ placeholder, change, value }) {
    return (
        <SearchContainer>
            <SearchInput placeholder={placeholder} onChange={(e) => change(e.target.value)} value={value} />
            <SearchButton onClick={() => value && change('')} >
                {
                    value ? <span role="img" aria-label="icon">X</span>
                        : <span role="img" aria-label="icon">🔍</span>
                }
            </SearchButton>
        </SearchContainer>
    )
}



export default Search
