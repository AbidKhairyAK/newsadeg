import React, { useState } from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'validate.js'

import { FormInput, BaseHeader, BaseText, BaseIcon, FormImage, BaseButton, BaseCard } from '@/components'
import { sizes, colors } from '@/constants'
import { useForm } from '@/hooks'
import { getUser } from '@/helpers'
import { RestaurantDriverService } from '@/services'
import { setRestaurantDrivers } from '@/store/master'

const DriverForm = ({ route, navigation }) => {
	const dispatch = useDispatch()
	const { restaurant_drivers } = useSelector(state => state.master)
	const { initialForm = {} } = route.params || {}

	const [isShowPassword, setIsShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState({
		submit: false,
		delete: false,
	})
	const { form, getFormData, setFormInline, resetForm, validateForm, validateFormInline, formErrors } = useForm({
		restaurant_id: getUser().id,
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

	return (
		<ScrollView>
			<BaseHeader title="DRIVER FORM" withBack />

			<BaseCard padding="base" style={styles.card}>
				<FormInput
					label="Full Name"
					value={form.fullname}
					error={formErrors.fullname}
					onChangeText={setFormInline('fullname')}
					onEndEditing={validateFormInline('fullname')}
				/>
				<FormInput
					label="Email"
					value={form.email}
					error={formErrors.email}
					onChangeText={setFormInline('email')}
					onEndEditing={validateFormInline('email')}
					keyboardType="email-address"
					autoCapitalize="none"
				/>

				<View style={styles.passwordWrapper}>
					<FormInput
						label="Password"
						secureTextEntry={!isShowPassword}
						style={styles.passwordInput}
						value={form.password}
						error={formErrors.password}
						onChangeText={setFormInline('password')}
						onEndEditing={validateFormInline('password')}
					/>
					<TouchableOpacity style={styles.passwordButton} onPress={toggleShowPassword}>
						<BaseIcon
							name={isShowPassword ? 'eye-outline' : 'eye-off-outline'}
							color={isShowPassword ? 'green' : 'gray'}
						/>
					</TouchableOpacity>
				</View>

				<FormInput
					label="Phone Number"
					value={form.phone_number}
					error={formErrors.phone_number}
					onChangeText={setFormInline('phone_number')}
					onEndEditing={validateFormInline('phone_number')}
					keyboardType="number-pad"
				/>

				<BaseText size="sm" color="gray">
					Vehicle Info
				</BaseText>
				<View style={styles.vehicleWrapper}>
					<FormInput
						placeholder="Year"
						style={styles.vehicleYear}
						value={form.vehicle_year}
						error={formErrors.vehicle_year}
						onChangeText={setFormInline('vehicle_year')}
						onEndEditing={validateFormInline('vehicle_year')}
						keyboardType="number-pad"
					/>
					<FormInput
						placeholder="Brand & Model"
						style={styles.vehicleModel}
						value={form.vehicle_model}
						error={formErrors.vehicle_model}
						onChangeText={setFormInline('vehicle_model')}
						onEndEditing={validateFormInline('vehicle_model')}
					/>
				</View>

				<FormImage
					label="Driver Photo"
					value={form.driver_photo_file}
					error={formErrors.driver_photo_file}
					initialImage={initialForm.driver_photo}
					onChangeImage={setFormInline('driver_photo_file', true)}
				/>

				<FormImage
					label="Driver License"
					value={form.driver_licence_file}
					error={formErrors.driver_licence_file}
					initialImage={initialForm.driver_licence}
					onChangeImage={setFormInline('driver_licence_file', true)}
				/>

				<BaseButton
					title="Submit"
					icon="cloud-upload-outline"
					bg="green"
					color="white"
					isLoading={isLoading.submit}
					disabled={isDisableAction}
					onPress={handleSubmit}
				/>

				{!isEmpty(initialForm) && 
					<BaseButton
						title="Delete Driver"
						icon="trash-outline"
						bg="red"
						color="white"
						isLoading={isLoading.delete}
						disabled={isDisableAction}
						onPress={confirmDelete}
						style={styles.deleteButton}
					/>
				}
			</BaseCard>
		</ScrollView>
	)
} 

export default DriverForm

const styles = StyleSheet.create({
	card: { margin: sizes.base, marginTop: 0 },
	passwordWrapper: { flexDirection: 'row' },
	passwordInput: { flex: 1 },
	passwordButton: { paddingHorizontal: sizes.xs, alignSelf: 'stretch', justifyContent: 'center', paddingTop: sizes.xs },
	vehicleWrapper: { flexDirection: 'row', marginTop: sizes.xxxs, marginHorizontal: sizes.xs / -2 },
	vehicleYear: { marginHorizontal: sizes.xs / 2, width: '25%' },
	vehicleModel: { marginHorizontal: sizes.xs / 2, flex: 1 },
	deleteButton: { marginTop: sizes.base }
})