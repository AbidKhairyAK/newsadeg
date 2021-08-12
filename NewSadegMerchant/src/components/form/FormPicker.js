import React from 'react'
import { View, StyleSheet } from 'react-native'
import PickerSelect from 'react-native-picker-select'

import { BaseText } from '@/components'
import { colors, sizes } from '@/constants'

const pickerStyle = StyleSheet.create({ 
	inputIOS: { color: colors.black },
	inputAndroid: { color: colors.black },
})

const FormPicker = ({ style, noMargin, label, error, ...props }) =>
	<View style={styles.container(noMargin)}>
		{label && <BaseText size="sm" color="gray" style={styles.label}>
			{label}
		</BaseText>}

		<View style={styles.pickerWrapper}>
			<PickerSelect 
				{...props} 
				style={pickerStyle}
			/>
		</View>

		{error && <BaseText color="red" size="xs" style={styles.error}>
			{error}
		</BaseText>}
	</View>
	
export default FormPicker

const styles = StyleSheet.create({
	container: noMargin => ({ marginBottom: noMargin ? 0 : sizes.base }),
	label: { marginBottom: sizes.xxxs },
	pickerWrapper: { backgroundColor: colors.lightGray, borderRadius: sizes.xs },
	error: { marginTop: sizes.base / 4 }
})