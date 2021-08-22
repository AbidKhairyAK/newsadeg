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
}) => <>
	<FormInput 
		label="Bank Name"
		value={form.bank_name}
		error={formErrors.bank_name}
		onChangeText={setFormInline('bank_name')}
		onEndEditing={validateFormInline('bank_name')}
	/>
	<FormInput 
		label="Bank Account Username"
		value={form.bank_account_username}
		error={formErrors.bank_account_username}
		onChangeText={setFormInline('bank_account_username')}
		onEndEditing={validateFormInline('bank_account_username')}
	/>
	<FormInput 
		label="Bank Account Code"
		value={form.bank_account_code}
		error={formErrors.bank_account_code}
		onChangeText={setFormInline('bank_account_code')}
		onEndEditing={validateFormInline('bank_account_code')}
	/>
	<FormImage
		label="Bank Account Photo"
		value={form.bank_account_photo_file}
		error={formErrors.bank_account_photo_file}
		initialImage={initialForm.bank_account_photo}
		onChangeImage={setFormInline('bank_account_photo_file', true)}
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