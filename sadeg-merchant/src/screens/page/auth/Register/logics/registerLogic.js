import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message'

import { useForm } from '@/hooks'
import { RestaurantService } from '@/services'

const registerLogic = () => {
	const navigation = useNavigation()

	const [isLoading, setIsLoading] = useState(false)

	const { form, setFormInline, resetForm, validateAsync, validateFormInline, formErrors } = useForm({
		email: '',
		password: '',
		owner_name: '',
		identity_card_number: '',
		phone_number: '',
	}, {
		email: { presence: true, length: { maximum: 254 }, email: true, emailAvailable: RestaurantService },
		password: { presence: true, length: { minimum: 4, maximum: 20 } },
		owner_name: { presence: true, length: { maximum: 254 } },
		identity_card_number: { presence: true, length: { maximum: 254 } },
		phone_number: { presence: true, length: { maximum: 254 } },
	})

	const handleRegister = async () => {
		try {
			setIsLoading(true)

			const isFormErr = await validateAsync()
			if (isFormErr) return

			await RestaurantService.create(form)
			resetForm()
			showMessage({
				message: 'registration success',
				description: 'please login and complete your restaurant data',
				type: 'success',
				icon: 'success',
				duration: 5000
			})

			navigation.navigate('Login')
		} catch (err) { 
			console.error('handleRegister', err) 
		} finally {
			setIsLoading(false)
		}
	}

	return { form, setFormInline, handleRegister, isLoading, validateFormInline, formErrors }
}

export default registerLogic