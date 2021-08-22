import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'validate.js'

import { useForm } from '@/hooks'
import { getRestaurant } from '@/helpers'
import { RestaurantService } from '@/services'
import { setRestaurantData } from '@/store/restaurant'

const crudLogic = ({ navigation }) => {
	const dispatch = useDispatch()
	const initialForm = useSelector(state => state.restaurant)
	const { 
		bank_account_photo,
		bank_name,
		bank_account_username,
		bank_account_code
	} = initialForm

	const [isLoading, setIsLoading] = useState(false)
	const { form, setFormInline, validateForm, validateFormInline, formErrors, getFormData } = useForm({
		bank_account_photo_file: null,
		bank_name: bank_name || '',
		bank_account_username: bank_account_username || '',
		bank_account_code: bank_account_code || '',
	}, {
		bank_account_photo_file: { presence: isEmpty(bank_account_photo) },
		bank_name: { presence: true, length: { maximum: 254 } },
		bank_account_username: { presence: true, length: { maximum: 254 } },
		bank_account_code: { presence: true, length: { maximum: 254 } },
	})

	const handleSubmit = async () => {
		try {
			if (validateForm()) return

			setIsLoading(true)

			const res = await RestaurantService.update(getFormData())
		
			dispatch(setRestaurantData(res))
		
			navigation.goBack()
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		initialForm,
		form,
		setFormInline,
		validateFormInline,
		formErrors,
		isLoading,
		handleSubmit,
	}
}

export default crudLogic