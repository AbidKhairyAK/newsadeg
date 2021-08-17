import React from 'react'
import { View, StyleSheet } from 'react-native'

import { ShadowView, BaseText } from '@/components'
import { colors, sizes } from '@/constants'
import { toTitleCase } from '@/helpers'

const statusColors = {
	// on process
	waiting: colors.red,
	on_delivery: colors.blue,
	process: colors.yellow,
	ready: colors.green,

	// history
	canceled: colors.red,
	success: colors.green,
	disapproved: colors.gray,
}

const StatusBadge = ({ status }) =>
	<ShadowView type="item" radius="xxs" style={styles.statusWrapper}>
		<View style={styles.statusInner(statusColors[status])}>
			<BaseText type="bold" size="xxs" color="white">
				{status === 'waiting' ? 'New Order' : toTitleCase(status)}
			</BaseText>
		</View>
	</ShadowView>

export default StatusBadge

const styles = StyleSheet.create({
	statusWrapper: { alignSelf: 'center' },
	statusInner: (bg) => ({ padding: sizes.xxxs, borderRadius: sizes.xxs, backgroundColor: bg || colors.black }),
})