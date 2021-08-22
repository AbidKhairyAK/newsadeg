import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'validate.js'

import { useForm } from '@/hooks'
import { getRestaurant } from '@/helpers'
import { RestaurantService } from '@/services'
import { setRestaurantData } from '@/store/restaurant'
import { compressImage } from '@/helpers'

const crudLogic = ({ navigation }) => {
	const dispatch = useDispatch()
	const initialForm = useSelector(state => state.restaurant)
	const { 
		baladyh_licence_photo,
		banner_restaurant,
		commercial_register_photo,
		restaurant_name,
		commercial_register_code,
		baladyh_licence_code,
	} = initialForm

	const [isLoading, setIsLoading] = useState(false)
	const { form, setFormInline, validateForm, validateFormInline, formErrors, getFormData } = useForm({
		baladyh_licence_photo_file: null,
		banner_restaurant_file: null,
		commercial_register_photo_file: null,
		restaurant_name: restaurant_name || '',
		commercial_register_code: commercial_register_code || '',
		baladyh_licence_code: baladyh_licence_code || '',
	}, {
		baladyh_licence_photo_file: { presence: isEmpty(baladyh_licence_photo) },
		banner_restaurant_file: { presence: isEmpty(banner_restaurant) },
		commercial_register_photo_file: { presence: isEmpty(commercial_register_photo) },
		restaurant_name: { presence: true, length: { maximum: 254 } },
		commercial_register_code: { presence: true, length: { maximum: 254 } },
		baladyh_licence_code: { presence: true, length: { maximum: 254 } },
	})

	const handleSubmit = async () => {
		try {
			if (validateForm()) return

			setIsLoading(true)

			const formData = getFormData()

			if (form.banner_restaurant_file) {
				const thumbnail = await compressImage(form.banner_restaurant_file)

				formData.append('banner_restaurant_thumbnail_file', {
					uri: thumbnail.uri,
					name: thumbnail.fileName,
					type: thumbnail.type,
				})
			}

			const res = await RestaurantService.update(formData)
		
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