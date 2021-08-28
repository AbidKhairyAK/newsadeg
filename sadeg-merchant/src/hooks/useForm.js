import { useState } from 'react'
import { isEmpty } from 'validate.js'
import { showMessage } from 'react-native-flash-message'

import { validate } from '@/utils'

validate.validators.emailAvailable = (value, Service) => (
	new validate.Promise((resolve, reject) => {
		Service.checkEmail(value).then(res => {
			console.log(Service)
			console.log('emailAvailable', value, res)
			if (res) resolve('already used')
			else resolve()
		}).catch(err => {
			console.error(err)
			resolve('error while checking the email')
		})
	})
)

const useForm = (initialValue, rules) => {
	const [values, setValues] = useState(initialValue)
	const [formErrors, setFormErrors] = useState({})

	const postValidation = res => {
		console.log('validated', res)
		
		if (res) {
			Object.keys(res).forEach(key => res[key] = res[key][0])
			setFormErrors(res)

			showMessage({
				message: Object.values(res)[0],
				type: 'danger',
				icon: 'danger',
			})
		} else {
			setFormErrors({})
		}
	}

	const validateForm = () => {
		const res = validate(values, rules)
		postValidation(res)
		return res
	}

	const validateAsync = async () => {
		try {
			const res = await validate.async(values, rules)
			postValidation()
		} catch (err) {
			postValidation(err)
			return err
		}
	}

	const validateSingle = (formType, formValue) => {
		const res = validate.single(formValue || values[formType], rules[formType])
		setFormErrors(prev => ({ ...prev, [formType]: res ? formType + ' ' + res[0] : null }))
	}

	const validateFormInline = formType => e => validateSingle(formType)

	const setForm = (formType, formValue) => setValues(prevValues => ({ ...prevValues, [formType]: formValue })) // normal function version

	const setFormInline = (formType, withValidate) => formValue => { // inline onChangeText version
		setForm(formType, formValue)
		if (withValidate !== false && (withValidate || formErrors[formType])) {
			validateSingle(formType, formValue)
		}
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
		validateAsync,
		validateSingle,
		validateFormInline,
		formErrors
	}
}

export default useForm