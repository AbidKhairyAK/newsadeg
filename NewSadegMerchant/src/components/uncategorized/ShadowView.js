import React from 'react'
import { Shadow } from 'react-native-shadow-2'

import { shadows, sizes } from '@/constants'

const ShadowView = ({ type, radius, style, children, ...props }) => {
	const shadowConfig = shadows[type]
	
	radius = typeof radius === 'string' ? sizes[radius] :
		typeof radius === 'number' ? radius :
		0

	return <Shadow
		paintInside={true}
		containerViewStyle={style}
		radius={radius}
		{...shadowConfig}
		{...props} 
	>
		{children}
	</Shadow>
}

export default ShadowView