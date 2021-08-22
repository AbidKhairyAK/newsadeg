import React, { useState } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

import { ModalForm, FormInput, BaseIcon } from '@/components'
import { RestaurantService, AuthService } from '@/services'
import { setRestaurantData } from '@/store/restaurant'
import { useForm } from '@/hooks'
import { getRestaurant } from '@/helpers'
import { colors, sizes } from '@/constants'

const PasswordForm = ({ navigation }) => {
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)
	const [isShowPassword, setIsShowPassword] = useState({
		old: false,
		new: false,
	})
	const { form, setFormInline, validateForm, validateFormInline, formErrors } = useForm({
		old_password: '',
		new_password: ''
	}, {
		old_password: { presence: true, length: { minimum: 4, maximum: 30 } },
		new_password: { presence: true, length: { minimum: 4, maximum: 30 } }
	})

	const toggleShowPassword = type => e => setIsShowPassword(prev => ({ ...prev, [type]: !prev[type] }))

	const handleSubmit = async () => {
		try {
			if (validateForm()) return

			setIsLoading(true)
			const checkPassword = await AuthService.login({
				email: getRestaurant().email,
				password: form.old_password
			})

			const res = await RestaurantService.update({
				password: form.new_password
			})

			dispatch(setRestaurantData(res))
			navigation.goBack()
		} catch (err) {
			if ([401, 400].includes(err?.response?.status)) showMessage({
				message: 'old password is incorrect',
				type: 'danger',
				icon: 'danger',
				duration: 5000
			})
			else if (err.response) showMessage({
				message: err.response.data.message || err.response.data.error || err.response.data,
				type: 'danger',
				icon: 'danger',
				duration: 5000
			})
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<ModalForm 
			title="Change Password" 
			isLoading={isLoading} 
			onPressPositive={handleSubmit}
		>
			<View style={styles.passwordWrapper}>
				<FormInput
					label="Old Password"
					secureTextEntry={!isShowPassword.old}
					style={styles.passwordInput}
					value={form.old_password}
					error={formErrors.old_password}
					onChangeText={setFormInline('old_password')}
					onEndEditing={validateFormInline('old_password')}
				/>
				<TouchableOpacity style={styles.passwordButton} onPress={toggleShowPassword('old')}>
					<BaseIcon
						name={isShowPassword.old ? 'eye-outline' : 'eye-off-outline'}
						color={isShowPassword.old ? 'green' : 'gray'}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.passwordWrapper}>
				<FormInput
					label="New Password"
					secureTextEntry={!isShowPassword.new}
					style={styles.passwordInput}
					value={form.new_password}
					error={formErrors.new_password}
					onChangeText={setFormInline('new_password')}
					onEndEditing={validateFormInline('new_password')}
				/>
				<TouchableOpacity style={styles.passwordButton} onPress={toggleShowPassword('new')}>
					<BaseIcon
						name={isShowPassword.new ? 'eye-outline' : 'eye-off-outline'}
						color={isShowPassword.new ? 'green' : 'gray'}
					/>
				</TouchableOpacity>
			</View>

		</ModalForm>
	)
}

export default PasswordForm

const styles = StyleSheet.create({
	passwordWrapper: { flexDirection: 'row' },
	passwordInput: { flex: 1 },
	passwordButton: { paddingHorizontal: sizes.xs, alignSelf: 'stretch', justifyContent: 'center', paddingTop: sizes.xs },
	vehicleWrapper: { flexDirection: 'row', marginTop: sizes.xxxs, marginHorizontal: sizes.xs / -2 },
	vehicleYear: { marginHorizontal: sizes.xs / 2, width: '25%' },
	vehicleModel: { marginHorizontal: sizes.xs / 2, flex: 1 },
})