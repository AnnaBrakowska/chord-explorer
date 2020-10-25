import React from 'react';
import styled from 'styled-components'

const CardBody = styled.div`
    border: 1px solid white;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

const Card = ({ title, chord }) => (
    <CardBody>
        <h1>{title}</h1>
        <p>{chord}</p>
    </CardBody>
)

export default Card