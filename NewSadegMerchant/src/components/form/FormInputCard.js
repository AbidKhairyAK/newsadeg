import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

import { BaseText, BaseIcon, ShadowView } from '@/components'
import { sizes, colors, fontTypes } from '@/constants'
import { validate } from '@/utils'

const FormInputCard = ({ style, label, icon, noMargin, error, children, ...props }) => {
	return (
		<ShadowView
			type="card"
			radius={sizes.base * 1.5}
			style={{
				...styles.container(noMargin),
				...style
			}}
		>
			<View style={styles.inner}>
				<BaseText size="sm" color={error ? 'red' : 'gray'}>
					{label}
				</BaseText>

				<View style={styles.inputWrapper}>
					<BaseIcon name={icon} size="lg" color={error ? 'red' : 'gray'} />
					<TextInput {...props} style={styles.input} />
					{children}
				</View>

				{error && <BaseText color="red" size="xs" style={styles.error}>
					{error}
				</BaseText>}
			</View>
		</ShadowView>
	)
}
export default FormInputCard

const styles = StyleSheet.create({
	container: (noMargin) => ({ marginBottom: noMargin ? 0 : sizes.base * 1.5 }),
	inner: { backgroundColor: colors.white, borderRadius: sizes.base * 1.5, paddingHorizontal: sizes.base * 1.5, paddingTop: sizes.base, paddingBottom: sizes.base / 1.5 },
	inputWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: sizes.base / 4 },
	input: { flex: 1, padding: 0, paddingHorizontal: sizes.base / 2, paddingBottom: sizes.base / 4, paddingTop: 0, fontSize: sizes.base, fontFamily: fontTypes.regular },
	error: { marginTop: sizes.base / 4 }
})