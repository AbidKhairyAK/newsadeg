import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { BaseText, ShadowView } from '@/components'
import { sizes, colors } from '@/constants'

const TypeSection = ({ title, isSelected, onPress }) => (
	<ShadowView 
		type="card"
		radius="xs"
		style={styles.itemWrapper}
	>
		<TouchableOpacity delayPressIn={100} onPress={onPress}>
			<View style={{
				...styles.itemInner,
				...styles[isSelected ? 'itemInnerActive' : 'itemInnerNormal']
			}}>
				<BaseText 
					align="center" 
					size="xs" 
					type="bold" 
					color={isSelected ? 'white' : 'black'}
				>
					{title}
				</BaseText>
			</View>
		</TouchableOpacity>
	</ShadowView>
)

export default TypeSection

const styles = StyleSheet.create({
	container: { marginBottom: sizes.base, marginHorizontal: sizes.base, flexDirection: 'row', justifyContent: 'space-between' },
	itemWrapper: { width: '48%' },
	itemInner: { padding: sizes.xs, borderRadius: sizes.xs },
	itemInnerActive: { backgroundColor: colors.green },
	itemInnerNormal: { backgroundColor: colors.white },
})