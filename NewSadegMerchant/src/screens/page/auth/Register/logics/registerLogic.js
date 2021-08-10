import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { useForm } from '@/hooks'
import { RestaurantService } from '@/services'

const registerLogic = () => {
	const navigation = useNavigation()

	const [isLoading, setIsLoading] = useState(false)

	const { form, setFormInline, resetForm, validateForm, validateFormInline, formErrors } = useForm({
		email: '',
		password: '',
		owner_name: '',
		identity_card_number: '',
		phone_number: '',
	}, {
		email: { presence: true, length: { maximum: 254 }, email: true },
		password: { presence: true, length: { minimum: 4, maximum: 20 } },
		owner_name: { presence: true, length: { maximum: 254 } },
		identity_card_number: { presence: true, length: { maximum: 254 } },
		phone_number: { presence: true, length: { maximum: 254 } },
	})

	const handleRegister = async () => {
		try {
			const isFormErr = validateForm()
			if (isFormErr) return

			setIsLoading(true)
			await RestaurantService.create(form)
			resetForm()
			// munculin success modal atau snackbar

			navigation.navigate('Login')
		} catch (err) { 
			console.error(err) 
		} finally {
			setIsLoading(false)
		}
	}

	return { form, setFormInline, handleRegister, isLoading, validateFormInline, formErrors }
}

export default registerLogic