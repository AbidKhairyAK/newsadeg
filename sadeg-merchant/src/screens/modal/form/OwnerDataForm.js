import React, { useState } from 'react'
import { View, ScrollView, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { ModalForm, FormInput } from '@/components'
import { RestaurantService } from '@/services'
import { setRestaurantData } from '@/store/restaurant'
import { useForm } from '@/hooks'

const OwnerDataForm = ({ navigation }) => {
	const dispatch = useDispatch()
	const { 
		owner_name, 
		identity_card_number 
	} = useSelector(state => state.restaurant)

	const [isLoading, setIsLoading] = useState(false)
	const { form, setFormInline, validateForm, validateFormInline, formErrors } = useForm({
		owner_name: owner_name || '',
		identity_card_number: identity_card_number || ''
	}, {
		owner_name: { presence: true, length: { maximum: 254 } },
		identity_card_number: { presence: true, length: { maximum: 254 } }
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
			title="Owner Data" 
			isLoading={isLoading} 
			onPressPositive={handleSubmit}
		>
			<FormInput 
				label="Owner Name"
				value={form.owner_name}
				error={formErrors.owner_name}
				onChangeText={setFormInline('owner_name')}
				onEndEditing={validateFormInline('owner_name')}
			/>
			<FormInput 
				label="Identity Card Number"
				value={form.identity_card_number}
				error={formErrors.identity_card_number}
				onChangeText={setFormInline('identity_card_number')}
				onEndEditing={validateFormInline('identity_card_number')}
			/>
		</ModalForm>
	)
}

export default OwnerDataForm