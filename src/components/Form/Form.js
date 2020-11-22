import React, { useState } from 'react'
import { FormContainer, FormInput, FormButton, FormBottomContainer } from './Form.elements';
import validateData from '../../utils/validateData'
function Form({ inputs, buttons }) {
    const [errors, setErrors] = useState({})

    const handleValidation = (e) => {
        let err = validateData(e.currentTarget.type, e.currentTarget.value)
        setErrors(() => ({ ...errors, [e.currentTarget.type]: err }))
        console.log(errors)
    }

    return (
        <FormContainer>
            {inputs && (inputs.map(el =>
                <>
                    <FormInput
                        placeholder={el.placeholder}
                        name={el.name} type={el.type}
                        required={el.required} onChange={(e) => el.handler(e)}
                        onBlur={(e) => handleValidation(e)}
                        error={errors[el.type]}
                        pattern={el.pattern}
                    />
                    <p>{errors[el.type]}</p>
                </>
            ))}
            <FormBottomContainer>
                {buttons && (buttons.map(el => <FormButton disabled={Object.keys(errors).length} onClick={(e) => el.switch ? el.handler(el.switch) : el.handler(e)} background={el.background} type={el.type} value={el.label} />))}
            </FormBottomContainer>
        </FormContainer >
    )
}

export default Form
