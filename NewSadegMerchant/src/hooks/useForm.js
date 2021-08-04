import { useState } from 'react'

import { validate } from '@/utils'

const useForm = (initialValue, rules) => {
	const [values, setValues] = useState(initialValue)
	const [formErrors, setFormErrors] = useState({})

	const setForm = (formType, formValue) => setValues(prevValues => ({ ...prevValues, [formType]: formValue })) // normal function version
	const setFormInline = formType => formValue => setForm(formType, formValue) // inline onChangeText version

	const resetForm = () => setValues(initialValue)

	const validateForm = () => {
		const res = validate(values, rules)
		if (res) {
			Object.keys(res).forEach(key => res[key] = res[key][0])
			setFormErrors(res)
		}
		return res
	}

	const validateFormInline = formType => e => {
		const res = validate.single(values[formType], rules[formType])
		setFormErrors(prev => ({ ...prev, [formType]: res ? formType + ' ' + res[0] : null }))
	}

	return {
		form: values,
		setForm,
		setFormInline,
		resetForm,

		validateForm,
		validateFormInline,
		formErrors
	}
}

export default useForm