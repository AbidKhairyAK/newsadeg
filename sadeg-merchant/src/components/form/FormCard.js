import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseText, ShadowView } from '@/components'
import { colors, sizes } from '@/constants'

const FormCard = ({ children, title, description }) =>
	<ShadowView type="card" style={styles.container}>
		<View style={styles.header}>
			<BaseText align="center" style={styles.title}>
				{title}
			</BaseText>
			<BaseText align="center" color="gray" size="sm">
				{description}
			</BaseText>
		</View>

		{children}
	</ShadowView>

export default FormCard

const styles = StyleSheet.create({
	container: { borderRadius: sizes.base, marginHorizontal: sizes.base, marginBottom: sizes.xl, padding: sizes.base, paddingBottom: sizes.base / 4 },
	header: { paddingBottom: sizes.lg, marginBottom: sizes.xl, borderColor: colors.border, borderBottomWidth: 1 },
	title: { marginBottom: sizes.xxxs },
})