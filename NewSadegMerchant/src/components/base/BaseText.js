import React from 'react'
import { Text } from 'react-native'

import { colors, fontTypes, sizes } from '@/constants'
import { DEFAULT_TEXT_SIZE, DEFAULT_TEXT_COLOR, DEFAULT_FONT_TYPE } from '@/config'

const BaseText = ({ children, style, color, size, align, type, lineHeight }) => {
	color = color ? colors[color] : colors[DEFAULT_TEXT_COLOR]
	type = type ? fontTypes[type] : fontTypes[DEFAULT_FONT_TYPE]
	size = size ? (Number(size) || sizes[size]) : sizes[DEFAULT_TEXT_SIZE]

	const textStyle = {
		textAlign: align,
		fontSize: size,
		color: color,
		fontFamily: type,
		...style
	}

	if (lineHeight) textStyle.lineHeight = Number(lineHeight)

	return <Text style={textStyle}>{children}</Text>
}

export default BaseText