import styled, { createGlobalStyle, css } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Source Sans Pro', sans-serif;
}
`;

export const ButtonStyles = css`
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

export const Button = styled.button`
  ${ButtonStyles}
`

export const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-gap: 5%;
    grid-template-columns: repeat(4, 1fr);

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
`

export const Row = styled.div`
  display: flex;
  width: 100%;
`;

export const Column = styled.div`
  display: flex;
  width: 100%;
  margin: 0 50px;
  width: 100%;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const PageContainer = styled.div`
  padding: 150px 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default GlobalStyle