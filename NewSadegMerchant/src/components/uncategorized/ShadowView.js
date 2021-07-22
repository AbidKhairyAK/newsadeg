import React from 'react'
import { ShadowFlex } from 'react-native-neomorph-shadows'

import { colors, shadows } from '@/constants'

const ShadowView = ({ type, style, children, ...props }) => 
	<ShadowFlex 
		{...props} 
		style={{
			backgroundColor: colors.white,
			...shadows[type],
			...style
		}}
	>
		{children}
	</ShadowFlex>

export default ShadowView