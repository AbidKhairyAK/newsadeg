import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { BaseIcon, BaseText } from '@/components'
import { sizes } from '@/constants'

const BalanceButton = ({ title, icon }) => {
	return (
		<TouchableOpacity delayPressIn={100}>
			<View type="item" style={styles.container}>
				<BaseIcon name={icon} color="green" style={styles.icon} />
				<BaseText color="gray" size="xs" type="semi-bold">
					{title}
				</BaseText>
			</View>
		</TouchableOpacity>
	)
}

export default BalanceButton

const styles = StyleSheet.create({
	container: { justifyContent: 'center', alignItems: 'center' },
	icon: { marginBottom: sizes.base / 4 }
})