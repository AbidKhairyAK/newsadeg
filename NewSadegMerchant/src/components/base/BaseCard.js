import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import { ShadowView } from '@/components'
import { colors, sizes } from '@/constants'

const BaseCard = ({ children, onPress, disabled, padding, radius, shadowType, innerStyle, ...props }) => {
	padding = padding ? sizes[padding] : sizes.xs
	radius = radius ? sizes[radius] : sizes.base
	shadowType = shadowType || 'card'

	return (
		<TouchableOpacity 
			onPress={onPress} 
			disabled={!onPress || disabled} 
			{...props}
		>
			<ShadowView 
				type={shadowType} 
				radius={radius}
			>
				<View style={[
					styles.inner(padding, radius), 
					innerStyle
				]}>	
					{children}
				</View>	
			</ShadowView>
		</TouchableOpacity>
	)
}

export default BaseCard

const styles = StyleSheet.create({
	inner: (padding, borderRadius) => ({
		padding,
		borderRadius,
		backgroundColor: colors.white
	})
})