import React, { useState } from 'react'
import { View, ScrollView, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { ModalForm, FormInput } from '@/components'
import { RestaurantService } from '@/services'
import { setRestaurantData } from '@/store/restaurant'
import { useForm } from '@/hooks'

const PhoneNumberForm = ({ navigation }) => {
	const dispatch = useDispatch()
	const { phone_number } = useSelector(state => state.restaurant)

	const [isLoading, setIsLoading] = useState(false)
	const { form, setFormInline, validateForm, validateFormInline, formErrors } = useForm({
		phone_number: phone_number || ''
	}, {
		phone_number: { presence: true, length: { maximum: 254 } }
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
			title="Change Phone Number" 
			isLoading={isLoading} 
			onPressPositive={handleSubmit}
		>
			<FormInput
				label="Phone Number"
				placeholder="+966"
				value={form.phone_number}
				error={formErrors.phone_number}
				onChangeText={setFormInline('phone_number')}
				onEndEditing={validateFormInline('phone_number')}
				keyboardType="phone-pad"
			/>
		</ModalForm>
	)
}

export default PhoneNumberForm