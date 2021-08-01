import React from 'react'
import { View, StyleSheet } from 'react-native'

import { BaseText, BaseIcon, HorizontalRule } from '@/components'
import { sizes, colors } from '@/constants'

const DetailItem = ({ icon, label, children, noBorder }) => <>
	<View style={styles.container}>
		<View style={styles.labelWrapper}>
			<BaseIcon name={icon} color="green" size="lg" style={styles.icon} />
			<BaseText size="sm" lineHeight={sizes.sm * 1.4}>
				{label}
			</BaseText>
		</View>
		{children}
	</View>

	{!noBorder && <HorizontalRule />}
</>

export default DetailItem

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	labelWrapper: { flexDirection: 'row', alignItems: 'center' },
	icon: { marginRight: sizes.xxxs },
})