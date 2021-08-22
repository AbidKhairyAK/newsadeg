import React, { useState } from 'react'
import { View, ScrollView, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { ModalForm, FormInput } from '@/components'
import { RestaurantService } from '@/services'
import { setRestaurantData } from '@/store/restaurant'
import { useForm } from '@/hooks'

const EmailAccountForm = ({ navigation }) => {
	const dispatch = useDispatch()
	const { email } = useSelector(state => state.restaurant)

	const [isLoading, setIsLoading] = useState(false)
	const { form, setFormInline, validateForm, validateFormInline, formErrors } = useForm({
		email: email || '',
	}, {
		email: { presence: true, email: true, length: { maximum: 254 } },
	})

	const handleSubmit = async () => {
		try {
			if (validateForm()) return

			setIsLoading(true)
			const res = await RestaurantService.update(form)
			dispatch(setRestaurantData(res))
			navigation.goBack()
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<ModalForm 
			title="Email Account" 
			isLoading={isLoading} 
			onPressPositive={handleSubmit}
		>
			<FormInput 
				label="Email"
				value={form.email}
				error={formErrors.email}
				onChangeText={setFormInline('email')}
				onEndEditing={validateFormInline('email')}
			/>
		</ModalForm>
	)
}

export default EmailAccountForm