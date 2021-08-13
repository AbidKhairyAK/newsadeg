import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from '@/hooks'
import { authenticate } from '@/store/auth'

const loginLogic = () => {
	const dispatch = useDispatch()
	const { isLoading } = useSelector(state => state.auth)

	const { form, setFormInline, validateForm, validateFormInline, resetForm, formErrors } = useForm({
		email: 'restaurant2@email.com',
		password: '1234'
	},{
		email: { presence: true, length: { maximum: 254 }, email: true },
		password: { presence: true, length: { minimum: 4, maximum: 20 } }
	})

	const handleLogin = async () => {
		const isFormErr = validateForm()
		if (isFormErr) return

		const res = await dispatch(authenticate(form))
		if (res.error) return

		resetForm()
	}

	return { isLoading, form, setFormInline, handleLogin, validateFormInline, formErrors }
}

export default loginLogic