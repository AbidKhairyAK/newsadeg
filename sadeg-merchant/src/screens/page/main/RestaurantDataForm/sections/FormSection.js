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
		initialImage={initialForm.banner_restaurant}
		onChangeImage={setFormInline('banner_restaurant_file', true)}
	/>
	<FormImage
		label="Commercial Register Photo"
		value={form.commercial_register_photo_file}
		error={formErrors.commercial_register_photo_file}
		initialImage={initialForm.commercial_register_photo}
		onChangeImage={setFormInline('commercial_register_photo_file', true)}
	/>
	<FormImage
		label="Baladyh Licence Photo"
		value={form.baladyh_licence_photo_file}
		error={formErrors.baladyh_licence_photo_file}
		initialImage={initialForm.baladyh_licence_photo}
		onChangeImage={setFormInline('baladyh_licence_photo_file', true)}
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