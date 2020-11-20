import React from 'react'
import { SuccessMessageContainer } from './SuccessMessage.elements';

function SuccessMessage({ message }) {
    return (
        <SuccessMessageContainer>
            {message}
        </SuccessMessageContainer>
    )
}

export default SuccessMessage
