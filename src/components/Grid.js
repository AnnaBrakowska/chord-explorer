import React from 'react';
import styled from 'styled-components'

const Grid = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-rows:    repeat(4, 3fr);
    grid-template-columns: repeat(3, 1fr);
`

export default Grid