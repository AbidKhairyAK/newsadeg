import React from 'react'
import { View, StyleSheet } from 'react-native'

import { ShadowView, FormInput, BaseButton } from '@/components'
import { sizes, colors } from '@/constants'

const FormSection = () => {
	return (
		<ShadowView type="card" radius="base" style={styles.shadow}>
			<View style={styles.inner}>
				<FormInput label="New Category" noMargin style={styles.input} />
				<BaseButton icon="add-outline" bg="green" color="white" style={styles.button} innerStyle={styles.buttonInner}/>
			</View>
		</ShadowView>
	)
}

export default FormSection

const styles = StyleSheet.create({
	shadow: { marginBottom: sizes.base, marginHorizontal: sizes.base },
	inner: { backgroundColor: colors.white, padding: sizes.base, borderRadius: sizes.base, flexDirection: 'row', alignItems: 'flex-end' },
	input: { flex: 1 },
	button: { marginLeft: sizes.xs },
	buttonInner: { paddingHorizontal: sizes.xs }
})