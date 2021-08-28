import React from 'react'
import { Shadow } from 'react-native-shadow-2'

import { shadows, sizes } from '@/constants'

const ShadowView = ({ type, radius, style, children, ...props }) => {
	const shadowConfig = shadows[type]
	
	radius = typeof radius === 'string' ? sizes[radius] :
		['number', 'object'].includes(typeof radius) ? radius :
		0

	return <Shadow
		paintInside={true}
		containerViewStyle={style || {}}
		radius={radius}
		finalColor={shadowConfig.startColor.substring(0, 7) + '00'}
		{...shadowConfig}
		{...props} 
	>
		{children}
	</Shadow>
}

export default ShadowView