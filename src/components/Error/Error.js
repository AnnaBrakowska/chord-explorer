import React from 'react'
import { ErrorContainer } from './Error.elements';

function Error({ message }) {
    return (
        <ErrorContainer>
            {message}
        </ErrorContainer>
    )
}

export default Error
