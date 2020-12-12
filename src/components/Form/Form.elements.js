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
    width: 50%;
    height: 44px;

    &:disabled {
        background: lightGray;
        cursor: no-drop;
    }
`;

export const FormBottomContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const FormSocialLink = styled.a`
    ${ButtonStyles}
    text-align: center;
    margin-bottom: 10px;
    width: 50%;
    text-decoration: none;
    background: ${({ type }) => (type === 'google' && 'blue')};

    &:hover {
        opacity: .8;
    }
`

export const FormSocialIcon = styled.img`
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 15px;
`

export const FormSocialContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

export const FormSeparator = styled.div`
    margin-bottom: 10px;
`