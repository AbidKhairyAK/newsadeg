import { useState } from 'react'
import { isEmpty } from 'validate.js'

import { validate } from '@/utils'

const useForm = (initialValue, rules) => {
	const [values, setValues] = useState(initialValue)
	const [formErrors, setFormErrors] = useState({})

	const validateForm = () => {
		const res = validate(values, rules)
		if (res) {
			Object.keys(res).forEach(key => res[key] = res[key][0])
			setFormErrors(res)
		}
		return res
	}

	const validateSingle = (formType, formValue) => {
		const res = validate.single(formValue || values[formType], rules[formType])
		setFormErrors(prev => ({ ...prev, [formType]: res ? formType + ' ' + res[0] : null }))
	}

	const validateFormInline = formType => e => validateSingle(formType)

	const setForm = (formType, formValue) => setValues(prevValues => ({ ...prevValues, [formType]: formValue })) // normal function version

	const setFormInline = (formType, withValidate) => formValue => { // inline onChangeText version
		setForm(formType, formValue)
		if (withValidate || formErrors[formType]) validateSingle(formType, formValue)
	} 

	const resetForm = () => setValues(initialValue)

	const getFormData = (modifiers = {}) => {
		const formData = new FormData()

		for (const field in values) {
			if (!isEmpty(values[field]) && !modifiers[field]) formData.append(field, values[field])
		}

		if (!isEmpty(modifiers)) {
			for (const key in modifiers) {
				formData.append(key, modifiers[key])
			}
		}

		return formData
	}

	return {
		form: values,
		setForm,
		setFormInline,
		resetForm,
		getFormData,

		validateForm,
		validateSingle,
		validateFormInline,
		formErrors
	}
}

export default useForm