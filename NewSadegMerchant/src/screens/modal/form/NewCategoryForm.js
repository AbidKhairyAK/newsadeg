import React, { useState } from 'react'
import { View, ScrollView, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { ModalForm, FormInput } from '@/components'
import { MenuCategoryService } from '@/services'
import { setCategories } from '@/store/master'
import { useForm } from '@/hooks'

const NewCategoryForm = ({ navigation }) => {
	const dispatch = useDispatch()
	const { categories } = useSelector(state => state.master)

	const [isLoading, setIsLoading] = useState(false)
	const { form, setFormInline, validateForm, formErrors } = useForm({
		name: ''
	}, {
		name: { presence: true, length: { maximum: 254 } }
	})

	const handleSubmit = async () => {
		try {
			if (validateForm()) return

			setIsLoading(true)
			const res = await MenuCategoryService.create(form.name)
			dispatch(setCategories([res, ...categories]))
			navigation.goBack()
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<ModalForm 
			title="New Category" 
			isLoading={isLoading} 
			onPressPositive={handleSubmit}
		>
			<FormInput 
				label="Category Name"
				placeholder="e.g. Food, Beverage, etc.."
				value={form.name}
				error={formErrors.name}
				onChangeText={setFormInline('name')}
			/>
		</ModalForm>
	)
}

export default NewCategoryForm