import styled from 'styled-components';
import { ButtonStyles } from '../../globalStyles'

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 70%;
`

export const FormInput = styled.input`
    border: 1px solid lightgray;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    width: 100%;
`;

export const FormButton = styled.input`
    ${ButtonStyles}
    background: ${({ background }) => background};
`;

export const FormBottomContainer = styled.div`
display: flex;
`