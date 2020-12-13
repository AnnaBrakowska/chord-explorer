import React, { useState } from 'react'
import { FormContainer, FormInput, FormButton, FormBottomContainer, FormSocialContainer, FormSocialLink, FormSocialIcon, FormError, FormSeparator } from './Form.elements';
import validateData from '../../utils/validateData'
import { Row, Column, Link } from '../../globalStyles'
function Form({ inputs, buttons }) {
    const [errors, setErrors] = useState({})

    const handleValidation = (e) => {
        e.persist()
        const target = e.currentTarget || e.target
        if (target.value) {
            let err = validateData(target.type, target.value)
            setErrors(() => ({ ...errors, [target.type]: err }))
        }
    }

    return (
        <FormContainer>
            {inputs && (inputs.map((el, index) =>
                <>
                    <FormInput
                        placeholder={el.placeholder}
                        name={el.name} type={el.type}
                        required={el.required} onChange={(e) => el.handler(e)}
                        onBlur={(e) => handleValidation(e)}
                        error={errors[el.type]}
                        pattern={el.pattern}
                        key={'input-' + index}
                    />
                    <FormError>{errors[el.type]}</FormError>
                </>
            ))}
            <FormBottomContainer>
                <FormButton
                    onClick={(e) => buttons[0].handler(e)}
                    disabled={Object.values(errors).filter(el => !!el !== false).length}
                    key='button-0'
                    background={buttons[0].background} type={buttons[0].type} value={buttons[0].label}
                />
            </FormBottomContainer>
            <Row>
                <Column><FormSeparator>- or -</FormSeparator></Column>
            </Row>
            <FormSocialContainer>
                <FormSocialLink type='google' href="https://iimonj6pmb.execute-api.us-east-1.amazonaws.com/dev/authorize/social/google">
                    <FormSocialIcon src={require("../../assets/google.svg")} alt="Google logo" />
                    Continue with Google</FormSocialLink>
                {/* <FormSocialLink type='google' href="http://localhost:3000/social/google">Continue with Google</FormSocialLink> */}
            </FormSocialContainer>
            <p>
                {buttons[2].linkText}
                <Link onClick={() => buttons[1].handler(buttons[1].switch)}>{buttons[2].label}</Link>
            </p>
        </FormContainer >
    )
}

export default Form
