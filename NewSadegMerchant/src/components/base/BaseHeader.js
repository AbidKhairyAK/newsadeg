import React from 'react'
import { View } from 'react-native'

import { sizes } from '@/constants'

import BaseText from './BaseText'

const BaseHeader = ({ title }) => {
	return (
		<BaseText align="center" type="bold" style={{ marginVertical: sizes.xl }}>
			{title}
		</BaseText>
	)
}

export default BaseHeader