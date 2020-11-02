import styled from 'styled-components'

export const CardBody = styled.div`
    border: 1px solid white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 20px;
    border-left: 2px solid orange;

    @media screen and (max-width: 768px) {
        width: 100%;
        margin-top: 10px;
    }
`

export const CardTitle = styled.p`
    font-weight: 900;
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #1c2237;
`

export const CardSubtitle = styled.p`
    color: #a9b3c1;
    font-weight: 400;
`
