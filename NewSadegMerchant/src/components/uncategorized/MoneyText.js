import React from 'react'

import { BaseText } from '@/components'
import { sizes } from '@/constants'
import { formatNumber } from '@/helpers'

const MoneyText = ({ style, size, value }) => {
	value = formatNumber(value?.toFixed(2))
	size = size ? sizes[size] : sizes.base
	return (
		<BaseText type="bold" size={size} style={style}>
			<BaseText size={size * 0.6} color="green" type="semi-bold">
				SR
			</BaseText>
			{'\u00A0'}{value}
		</BaseText>
	)
}

export default MoneyText