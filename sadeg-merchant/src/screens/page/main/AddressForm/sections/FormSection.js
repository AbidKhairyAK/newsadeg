import React, { useRef, useState, useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'

import { FormInput, BaseText, ShadowView, MapView, FormPicker } from '@/components'
import { sizes, colors } from '@/constants'
import { getScreenSize } from '@/helpers'
import { useGeolocation } from '@/hooks'

const FormSection = ({
	initialForm,
	form,
	setFormInline,
	validateFormInline,
	formErrors,
	cityOptions,
	isLoading
}) => {

	return <>
		<FormPicker
			label="City"
			value={form.city_id}
			onValueChange={setFormInline('city_id')}
			items={cityOptions}
			isLoading={isLoading.city}
		/>

		<FormInput
			label="Address"
			multiline
			numberOfLines={3}
			inputStyle={styles.multilineInput}
			value={form.address}
			onChangeText={setFormInline('address')}
		/>

		<View style={styles.mapWrapper}>
			<BaseText size="sm" color="gray" style={styles.mapLabel}>
				Location on map
			</BaseText>
			<MapView
				showOverlay
				latitude={form.address_lat}
				longitude={form.address_long}
				onChangeLatitude={setFormInline('address_lat')}
				onChangeLongitude={setFormInline('address_long')}
			/>
		</View>
	</>
}

export default FormSection

const styles = StyleSheet.create({
	multilineInput: { textAlignVertical: 'top' },
	mapWrapper: { marginBottom: sizes.sm },
	mapLabel: { marginBottom: sizes.xxxs },
})