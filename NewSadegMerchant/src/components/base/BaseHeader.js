import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { BaseIcon, BaseText } from '@/components'
import { sizes, colors } from '@/constants'

const BaseHeader = ({ title, withBack, noMargin }) => {
	const navigation = useNavigation()

	return (
		<View style={styles.container}>
			{withBack &&
				<TouchableOpacity delayPressIn={100} onPress={navigation.goBack} style={styles.backButton}>
					<BaseIcon name="chevron-back-outline" />
				</TouchableOpacity>
			}
			<BaseText align="center" type="bold" color="gray" style={styles.title(noMargin)}>
				{title}
			</BaseText>
		</View>
	)
}

export default BaseHeader

const styles = StyleSheet.create({
	container: { flexDirection: 'row', position: 'relative' },
	backButton: { padding: sizes.base, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 0, left: 0, zIndex: 1 },
	title: (noMargin) => ({ marginVertical: noMargin ? 0 : sizes.xl, flex: 1 })
})