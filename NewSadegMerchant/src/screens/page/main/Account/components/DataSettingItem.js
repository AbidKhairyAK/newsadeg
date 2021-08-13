import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { BaseText, BaseIcon } from '@/components'
import { sizes } from '@/constants'

const DataSettingItem = ({ title, icon, onPress }) => (
	<TouchableOpacity  style={styles.container} onPress={onPress}>
		<View style={styles.inner}>
			<BaseIcon name={icon} size="lg" color="gray" style={styles.icon} />
			<BaseText size="sm">
				{title}
			</BaseText>
		</View>
		<BaseIcon name="chevron-forward-outline" size="base" color="gray" />
	</TouchableOpacity>
)

export default DataSettingItem

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	inner: { flexDirection: 'row', alignItems: 'center' },
	icon: { marginRight: sizes.xs }
})