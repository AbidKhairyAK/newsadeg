import React from 'react'
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native'

import { ShadowView, BaseIcon, BaseText } from '@/components'
import { colors, sizes } from '@/constants'

const BaseButton = ({ 
	isLoading, disabled, // logic props
	innerStyle, iconStyle, textStyle, // style props
	bg, radius, padding, shadowType, // wrapper props
	title, color, size, type, // text props
	icon, iconSize, iconColor, // icon props
	...props // other props
}) => {
	bg = bg ? colors[bg] : colors.white,
	radius = typeof radius === 'number' ? radius : (sizes[radius] || sizes.xs)
	padding = typeof padding === 'number' ? padding : sizes[padding]
	shadowType = shadowType || 'item'
	color = color || 'black'
	size = size || 'base'
	type = type || 'semi-bold'
	iconSize = iconSize || 'lg'
	iconColor = iconColor || color
	innerStyle = innerStyle || {}
	iconStyle = iconStyle || {}
	textStyle = textStyle || {}

	return (
		<TouchableOpacity  disabled={isLoading || disabled} {...props}>
			<ShadowView type={shadowType} radius={radius}>
				<View style={{ ...styles.inner(bg, radius, padding, disabled), ...innerStyle }}>
					{icon && <BaseIcon 
						name={icon}
						size={iconSize}
						color={iconColor} 
						style={{ ...styles.icon(!title), ...iconStyle }}
					/>}
					{title && <BaseText 
						color={color} 
						type={type}
						size={size}
						lineHeight={icon && sizes[size] * 1.35}
					>
						{title}
					</BaseText>}
					{isLoading && <View 
						style={styles.loadingBlock(bg, radius)}
					>
						<ActivityIndicator color={colors[color]} />
					</View>}
				</View>
			</ShadowView>
		</TouchableOpacity>
	)
}

export default BaseButton

const styles = StyleSheet.create({
	inner: (bg, radius, padding, disabled) => ({ 
		opacity: disabled ? 0.5 : 1,
		borderRadius: radius,
		backgroundColor: bg, 
		paddingVertical: padding || sizes.xs, 
		paddingHorizontal: padding || 0,
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'relative'
	}),
	loadingBlock: (bg, radius) => ({ 
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: bg,
		borderRadius: radius,
		justifyContent: 'center',
		alignItems: 'center' 
	}),
	icon: (noTitle) => noTitle ? {} : ({ marginRight: sizes.base / 3 }), // base (16) bagi 3 ( = 5.333 ) sebenarnya menyalahi prinsipku T_T tapi ini ukuran yg paling pas T_T
})