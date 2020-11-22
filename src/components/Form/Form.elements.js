import styled from 'styled-components';
import { ButtonStyles } from '../../globalStyles'

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 70%;
`

export const FormInput = styled.input`
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    width: 100%;
    border: ${({ error }) => (error ? '1px solid red' : '1px solid lightgray')};
`;

export const FormButton = styled.input`
    ${ButtonStyles}
    background: ${({ background }) => background};

    &:disabled {
        background: lightGray;
        cursor: no-drop;
    }
`;

export const FormBottomContainer = styled.div`
display: flex;
`