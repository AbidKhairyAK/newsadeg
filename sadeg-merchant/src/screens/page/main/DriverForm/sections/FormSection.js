import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { FormInput, BaseText, BaseIcon, FormImage } from '@/components'
import { sizes, colors } from '@/constants'

const FormSection = ({
	initialForm,
	form,
	setFormInline,
	validateFormInline,
	formErrors,
	isShowPassword,
	toggleShowPassword,
}) => <>
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
		onChangeText={setFormInline('email', false)}
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
		placeholder="+966"
		value={form.phone_number}
		error={formErrors.phone_number}
		onChangeText={setFormInline('phone_number')}
		onEndEditing={validateFormInline('phone_number')}
		keyboardType="phone-pad"
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
</>

export default FormSection

const styles = StyleSheet.create({
	passwordWrapper: { flexDirection: 'row' },
	passwordInput: { flex: 1 },
	passwordButton: { paddingHorizontal: sizes.xs, alignSelf: 'stretch', justifyContent: 'center', paddingTop: sizes.xs },
	vehicleWrapper: { flexDirection: 'row', marginTop: sizes.xxxs, marginHorizontal: sizes.xs / -2 },
	vehicleYear: { marginHorizontal: sizes.xs / 2, width: '25%' },
	vehicleModel: { marginHorizontal: sizes.xs / 2, flex: 1 },
})