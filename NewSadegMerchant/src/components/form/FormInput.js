import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

import { BaseText } from '@/components'
import { colors, sizes } from '@/constants'

const FormInput = ({ style = {}, label, noMargin, ...props }) =>
	<View style={{
		...styles.container(noMargin),
		...style
	}}>
		<BaseText size="sm" color="gray">
			{label}
		</BaseText>
		<TextInput {...props} style={styles.input} />
	</View>

export default FormInput

const styles = StyleSheet.create({
	container: (noMargin) => ({ marginBottom: noMargin ? 0 : sizes.sm }),
	input: { width: '100%', backgroundColor: colors.lightGray, borderRadius: sizes.xs, paddingHorizontal: sizes.xs, marginTop: sizes.xxxs }
})