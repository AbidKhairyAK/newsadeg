import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { BaseText, BaseCard, BaseIcon } from '@/components'
import { sizes, colors } from '@/constants'

const AdditionalSettingItem = ({ title, icon, onPress }) => (
	<BaseCard padding="xs" style={styles.card} innerStyle={styles.cardInner} onPress={onPress}>
		<BaseIcon name={icon} color="green" size="xxl" />
		<BaseText size="sm" color="gray" type="semi-bold" style={styles.text}>
			{title}
		</BaseText>
	</BaseCard>
)

export default AdditionalSettingItem

const styles = StyleSheet.create({
	card: { width: '46%' },
	cardInner: { alignItems: 'center' },
	text: { marginTop: sizes.base / 3 }
})