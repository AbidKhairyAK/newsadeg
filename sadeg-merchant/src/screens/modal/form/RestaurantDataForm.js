import React, { useState } from 'react'
import { View, ScrollView, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'validate.js'

import { ModalForm, FormInput, FormImage } from '@/components'
import { RestaurantService } from '@/services'
import { setRestaurantData } from '@/store/restaurant'
import { useForm } from '@/hooks'
import { compressImage } from '@/helpers'

const PhoneNumberForm = ({ navigation }) => {
	const dispatch = useDispatch()
	const { 
		baladyh_licence_photo,
		banner_restaurant,
		commercial_register_photo,
		restaurant_name,
		commercial_register_code,
		baladyh_licence_code,
	} = useSelector(state => state.restaurant)

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

	return (
		<ModalForm 
			title="Restaurant Data" 
			isLoading={isLoading} 
			onPressPositive={handleSubmit}
		>
			<FormInput 
				label="Restaurant Name"
				value={form.restaurant_name}
				error={formErrors.restaurant_name}
				onChangeText={setFormInline('restaurant_name')}
				onEndEditing={validateFormInline('restaurant_name')}
			/>
			<FormInput 
				label="Commercial Register Code"
				value={form.commercial_register_code}
				error={formErrors.commercial_register_code}
				onChangeText={setFormInline('commercial_register_code')}
				onEndEditing={validateFormInline('commercial_register_code')}
			/>
			<FormInput 
				label="Baladyh Licence Code"
				value={form.baladyh_licence_code}
				error={formErrors.baladyh_licence_code}
				onChangeText={setFormInline('baladyh_licence_code')}
				onEndEditing={validateFormInline('baladyh_licence_code')}
			/>
			<FormImage
				label="Banner Restaurant"
				value={form.banner_restaurant_file}
				error={formErrors.banner_restaurant_file}
				initialImage={banner_restaurant}
				onChangeImage={setFormInline('banner_restaurant_file', true)}
			/>
			<FormImage
				label="Commercial Register Photo"
				value={form.commercial_register_photo_file}
				error={formErrors.commercial_register_photo_file}
				initialImage={commercial_register_photo}
				onChangeImage={setFormInline('commercial_register_photo_file', true)}
			/>
			<FormImage
				label="Baladyh Licence Photo"
				value={form.baladyh_licence_photo_file}
				error={formErrors.baladyh_licence_photo_file}
				initialImage={baladyh_licence_photo}
				onChangeImage={setFormInline('baladyh_licence_photo_file', true)}
			/>
		</ModalForm>
	)
}

export default PhoneNumberForm