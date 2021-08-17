import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'validate.js'

import { useForm } from '@/hooks'
import { getRestaurant } from '@/helpers'
import { RestaurantDriverService } from '@/services'
import { setRestaurantDrivers } from '@/store/master'

const crudLogic = ({ route, navigation }) => {
	const dispatch = useDispatch()
	const { restaurant_drivers } = useSelector(state => state.master)
	const { initialForm = {} } = route.params || {}

	const [isShowPassword, setIsShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState({
		submit: false,
		delete: false,
	})
	const { form, getFormData, setFormInline, resetForm, validateForm, validateFormInline, formErrors } = useForm({
		restaurant_id: getRestaurant().id,
		fullname: initialForm.fullname || '',
		email: initialForm.email || '',
		password: '',
		phone_number: initialForm.phone_number || '',
		vehicle_year: initialForm.vehicle_year || '',
		vehicle_model: initialForm.vehicle_model || '',
		driver_photo_file: null,
		driver_licence_file: null,		
	}, {
		fullname: { presence: true, length: { maximum: 254 } },
		email: { presence: true, length: { maximum: 254 }, email: true },
		password: { presence: isEmpty(initialForm), length: { minimum: isEmpty(initialForm), maximum: 20 } },
		phone_number: { presence: true, length: { maximum: 20 } },
		vehicle_year: { presence: true, length: { is: 4 }, numericality: { greaterThanOrEqualTo: 1900, lessThanOrEqualTo: new Date().getFullYear() } },
		vehicle_model: { presence: true, length: { maximum: 254 } },
		driver_photo_file: { presence: isEmpty(initialForm) },
		driver_licence_file: { presence: isEmpty(initialForm) },
	})

	const changeLoading = (type, val) => setIsLoading(prev => ({ ...prev, [type]: val }))

	const toggleShowPassword = () => setIsShowPassword(prev => !prev)

	const handleSubmit = async () => {
		try {
			if (validateForm()) return
			changeLoading('submit', true)

			if (isEmpty(initialForm)) {
				const res = await RestaurantDriverService.create(getFormData())
				dispatch(setRestaurantDrivers([res, ...restaurant_drivers]))
			} else {
				const res = await RestaurantDriverService.update(initialForm.id, getFormData())
				const copiedData = [...restaurant_drivers]
				copiedData[copiedData.findIndex(item => item.id === initialForm.id)] = res
				dispatch(setRestaurantDrivers(copiedData))
			}

			resetForm()
			navigation.goBack()
		} catch (err) {
			console.error(err)
		} finally {
			changeLoading('submit', false)
		}
	}

	const handleDelete = async () => {
		try {
			changeLoading('delete', true)

			await RestaurantDriverService.delete(initialForm.id)

			const copiedData = [...restaurant_drivers]
			copiedData.splice(copiedData.findIndex(item => item.id === initialForm.id), 1)
			dispatch(setRestaurantDrivers(copiedData))

			resetForm()
			navigation.goBack()
		} catch (err) {
			console.error(err)
		} finally {
			changeLoading('delete', false)
		}
	}

	const confirmDelete = () => {
		navigation.navigate('ConfirmDialog', {
			desc: 'Deleted driver can\'t be recovered',
			positiveTitle: 'Delete',
			negativeTitle: 'Cancel',
			onPressPositive: handleDelete,
			onPressNegative: () => {},
			positiveColor: 'red',
			negativeColor: 'gray',
		})
	}

	const isDisableAction = Object.values(isLoading).includes(true)

	return {
		initialForm,
		form,
		setFormInline,
		validateFormInline,
		formErrors,
		isShowPassword,
		isLoading,
		toggleShowPassword,
		handleSubmit,
		confirmDelete,
		isDisableAction
	}
}

export default crudLogic