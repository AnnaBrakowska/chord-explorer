import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Source Sans Pro', sans-serif;
}
`;

export const Button = styled.button`
border-radius: 4px;
background: darkorange;
white-space: no-wrap;
font-weight: 300;
padding: ${({ big }) => big ? '12px 64px' : '10px 20px'};
color: #fff;
font-size: ${({ fontBig }) => fontBig ? '20px' : '16px'};
outline: none;
border: none;
cursor: pointer;

&:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background: orange;
}

@media screen and (max-width: 960px) {
    width: 100%;
}
`

export const Grid = styled.div`
    max-width: 100%;
    display: grid;
    grid-gap: 5%;
    grid-template-rows:    repeat(4, 3fr);
    grid-template-columns: repeat(3, 1fr);

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
`

export const Container = styled.div`
z-index: 1;
width: 100%;
max-width: 1300px;
margin-right: auto;
margin-left: auto;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Column = styled.div`
  position: relative;
  margin-bottom: 15px;
  flex: 1;
  max-width: 100%;
  flex-basis: 100%;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

export default GlobalStyle