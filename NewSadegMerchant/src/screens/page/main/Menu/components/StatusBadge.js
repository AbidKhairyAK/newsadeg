import React from 'react'
import { View, StyleSheet } from 'react-native'

import { ShadowView, BaseText } from '@/components'
import { colors, sizes } from '@/constants'

const StatusBadge = ({ status }) => {
	const statusLabel = {
		ready: 'IN',
		sold: 'OUT'
	}

	const statusColor = {
		ready: colors.green,
		sold: colors.red
	}

	return (
		<ShadowView type="item" radius="xxxs">
			<View style={styles.statusWrapper(statusColor[status])}>
				<BaseText size="xxs" color="white" type="semi-bold" lineHeight={sizes.xxs * 1.5}>
					{statusLabel[status]}
				</BaseText>
			</View>
		</ShadowView>
	)
}

export default StatusBadge

const styles = StyleSheet.create({
	statusWrapper: (bg) => ({ backgroundColor: bg, paddingHorizontal: sizes.base / 2, paddingVertical: sizes.base / 8, borderRadius: sizes.xxxs  })
})