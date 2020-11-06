import React from 'react';
import { SearchContainer, SearchInput, SearchButton } from './Search.elements'

function Search({ searchPlaceholder, submit, change, value }) {
    return (
        <SearchContainer>
            <SearchInput placeholder={searchPlaceholder} onChange={(e) => change(e.target.value)} value={value} />
            <SearchButton onClick={() => {
                submit()
                change('')
            }}>
                <span role="img" aria-label="icon">🔍</span>
            </SearchButton>
        </SearchContainer>
    )
}



export default Search
