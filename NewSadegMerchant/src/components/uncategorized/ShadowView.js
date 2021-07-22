import React from 'react'
import { Shadow, ShadowFlex } from 'react-native-neomorph-shadows'

import { colors, shadows } from '@/constants'

const ShadowView = ({ useManual, type, style, children, ...props }) => {
	const Comp = useManual ? Shadow : ShadowFlex

	return <Comp 
		{...props} 
		style={{
			backgroundColor: colors.white,
			...shadows[type],
			...style
		}}
	>
		{children}
	</Comp>
}

export default ShadowView