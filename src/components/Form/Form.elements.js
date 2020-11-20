import styled from 'styled-components';
import { Button } from '../../globalStyles'

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

export const FormButton = styled(Button)`
    background: ${({ background }) => background};
`;

export const FormBottomContainer = styled.div`
display: flex;
`