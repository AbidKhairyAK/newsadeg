import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

import { ShadowView, BaseText, BaseIcon } from '@/components'
import { sizes, colors, fontTypes } from '@/constants'

const FormInputCard = ({ style, label, icon, noMargin, children, ...props }) => 
	<ShadowView type="card" style={{
		...styles.container(noMargin),
		...style
	}}>
		<View style={styles.inner}>
			<BaseText size="sm" color="gray">
				{label}
			</BaseText>
			<View style={styles.inputWrapper}>
				<BaseIcon name={icon} size="lg" color="gray" />
				<TextInput {...props} style={styles.input}/>
				{children}
			</View>
		</View>
	</ShadowView>

export default FormInputCard

const styles = StyleSheet.create({
	container: (noMargin) => ({ marginBottom: noMargin ? 0 : sizes.base * 1.5, borderRadius: sizes.base * 1.5 }),
	inner: { backgroundColor: colors.white, borderRadius: sizes.base * 1.5, paddingHorizontal: sizes.base * 1.5, paddingTop: sizes.base, paddingBottom: sizes.base / 1.5 },
	inputWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: sizes.base / 4 },
	input: { flex: 1, padding: 0, paddingHorizontal: sizes.base / 2, paddingBottom: sizes.base / 4, paddingTop: 0, fontSize: sizes.base, fontFamily: fontTypes.regular }
})