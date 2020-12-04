import styled from 'styled-components';
import { ButtonStyles } from '../../globalStyles'

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 70%;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

export const FormInput = styled.input`
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    width: 100%;
    border: ${({ error }) => (error ? '1px solid red' : '1px solid lightgray')};
`;

export const FormError = styled.p`
    color: red;
`

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

export const FormSocialLink = styled.a`
    ${ButtonStyles}
    text-align: center;
    background: ${({ type }) => (type === 'facebook' && 'blue')};
    background: ${({ type }) => (type === 'google' && 'red')};
    background: ${({ type }) => (type === 'linkedin' && 'lightblue')};

    &:hover {
        opacity: .8;
    }
`

export const FormSocialContainer = styled.div`
    display: flex;
    justify-content: space-around;
`