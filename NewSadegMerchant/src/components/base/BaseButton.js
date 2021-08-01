import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { ShadowView, BaseIcon, BaseText } from '@/components'
import { colors, sizes } from '@/constants'

const BaseButton = ({ 
	onPress,
	style, innerStyle, iconStyle, textStyle, // style props
	bg, radius, shadowType, // wrapper props
	title, color, size, type, // text props
	icon, iconSize, iconColor // icon props
}) => {

	bg = bg ? colors[bg] : colors.white,
	radius = radius ? sizes[radius] : sizes.xs
	shadowType = shadowType || 'item'
	color = color || 'black'
	size = size || 'base'
	type = type || 'semi-bold'
	iconSize = iconSize || 'lg'
	iconColor = iconColor || color
	style = style || {}
	innerStyle = innerStyle || {}
	iconStyle = iconStyle || {}
	textStyle = textStyle || {}

	return (
		<TouchableOpacity style={style} onPress={onPress}>
			<ShadowView 
				type={shadowType}
				style={{ 
					...styles.inner(bg, radius), 
					...innerStyle 
				}}
			>
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
			</ShadowView>
		</TouchableOpacity>
	)
}

export default BaseButton

const styles = StyleSheet.create({
	inner: (bg, radius) => ({ 
		borderRadius: radius, 
		backgroundColor: bg, 
		paddingVertical: sizes.xs, 
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems: 'center' 
	}),
	icon: (noTitle) => noTitle ? {} : ({ marginRight: sizes.base / 3 }) // base (16) bagi 3 ( = 5.333 ) sebenarnya menyalahi prinsipku T_T tapi ini ukuran yg paling pas T_T
})