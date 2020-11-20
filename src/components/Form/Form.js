import React from 'react'
import { FormContainer, FormInput, FormButton, FormBottomContainer } from './Form.elements';

function Form({ inputs, buttons }) {
    return (
        <FormContainer>
            {inputs && (inputs.map(el =>
                <FormInput
                    placeholder={el.placeholder}
                    name={el.name} type={el.type}
                    required={el.required} onChange={(e) => el.handler(e)}
                    pattern={el.pattern} />
            ))}
            <FormBottomContainer>
                {buttons && (buttons.map(el => <FormButton onClick={(e) => el.switch ? el.handler(el.switch) : el.handler(e)} background={el.background} type={el.type}> {el.label}</FormButton>))}
            </FormBottomContainer>
        </FormContainer >
    )
}

export default Form
