import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

import { BaseText } from '@/components'
import { colors, sizes } from '@/constants'

const FormInput = ({ style, inputStyle, label, noMargin, error, optional, ...props }) =>
	<View style={[
		styles.container(noMargin), 
		style
	]}>
		{(label || optional) && 
			<View style={styles.label}>
				<BaseText size="sm" color="gray">
					{label}
				</BaseText>
				<BaseText size="xs" color="shallowGray">
					{optional && '* Optional'}
				</BaseText>
			</View>
		}
		<TextInput {...props} style={[
			styles.input,
			inputStyle
		]} />

		{error && <BaseText color="red" size="xs" style={styles.error}>
			{error}
		</BaseText>}
	</View>

export default FormInput

const styles = StyleSheet.create({
	container: (noMargin) => ({ marginBottom: noMargin ? 0 : sizes.sm }),
	label: { marginBottom: sizes.xxxs, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
	input: { width: '100%', backgroundColor: colors.lightGray, borderRadius: sizes.xs, paddingHorizontal: sizes.xs },
	error: { marginTop: sizes.base / 4 }
})