import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'validate.js'

import { useForm } from '@/hooks'
import { getRestaurant } from '@/helpers'
import { RestaurantService, MiscService } from '@/services'
import { setRestaurantData } from '@/store/restaurant'

const crudLogic = ({ navigation }) => {
	const dispatch = useDispatch()
	const initialForm = useSelector(state => state.restaurant)
	const { 
		city_id,
		address,
		address_lat,
		address_long,
	} = initialForm

	const [cityOptions, setCityOptions] = useState([])
	const [isLoading, setIsLoading] = useState({
		submit: false,
		city: false	
	})
	const { form, setFormInline, validateForm, validateFormInline, formErrors, getFormData } = useForm({
		city_id: city_id || null,
		address: address || '',
		address_lat: address_lat || 0,
		address_long: address_long || 0,
	}, {
		city_id: { presence: true },
		address: { presence: true, length: { maximum: 65535 } },
		address_lat: { presence: true },
		address_long: { presence: true },
	})

	const changeLoading = (type, status) => setIsLoading(prev => ({ ...prev, [type]: status }))

	const getCityOptions = async () => {
		try {
			changeLoading('city', true)
			const res = await MiscService.getSaudiCities()

			setCityOptions(res.map(item => ({
				value: item.id,
				label: item.nameEn,
				color: 'black'
			})))
		} catch (err) {
			console.err()
		} finally {
			changeLoading('city', false)
		}
	}

	const handleSubmit = async () => {
		try {
			if (validateForm()) return

			changeLoading('submit', true)
			const res = await RestaurantService.update(form)
			dispatch(setRestaurantData(res))
			navigation.goBack()
		} catch (err) {
			console.error(err)
		} finally {
			changeLoading('submit', false)
		}
	}

	useEffect(() => {
		getCityOptions()
	}, [])

	return {
		initialForm,
		form,
		setFormInline,
		validateFormInline,
		formErrors,
		isLoading,
		handleSubmit,
		cityOptions,
	}
}

export default crudLogic