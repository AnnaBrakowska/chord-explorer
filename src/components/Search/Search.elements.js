import styled from 'styled-components'

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    position: relative;
`
export const SearchInput = styled.input`
    padding: 20px;
    margin: 0px 0 20px 0;
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid lightgray;
    &:focus {
        outline: none;
        border-bottom: 1px solid orange;
    }
`
export const SearchButton = styled.button`
    background-color: orange;
    top: 0px;
    right: 0px;
    height: 50px;
    width: 52px;
    color: white;
    border-radius: 50%;
    border: none;
    position: absolute;
    cursor: pointer;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px;
    }
`
