import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { ShadowFlex } from 'react-native-neomorph-shadows'

import { BaseText } from '@/components'
import { sizes, colors, shadows } from '@/constants'

const types = {
	process: 'On Process',
	history: 'History'
}

const OrderType = () => {
	const [selected, setSelected] = useState('process')

	const changeSelected = type => e => setSelected(type)

	return (
		<View style={styles.container}>
			{Object.keys(types).map(type =>
				<ShadowFlex 
					key={type} 
					style={{
						...styles.itemWrapper,
						...styles[selected === type ? 'itemWrapperActive' : 'itemWrapperNormal']
					}}
				>
					<TouchableOpacity onPress={changeSelected(type)}>
						<View style={{
							...styles.itemInner,
							...styles[selected === type ? 'itemInnerActive' : 'itemInnerNormal']
						}}>
							<BaseText 
								align="center" 
								size="xs" 
								type="bold" 
								color={selected === type ? 'white' : 'black'}
							>
								{types[type]}
							</BaseText>
						</View>
					</TouchableOpacity>
				</ShadowFlex>
			)}
		</View>
	)
}

export default OrderType

const styles = StyleSheet.create({
	container: { marginBottom: sizes.base, marginHorizontal: sizes.base, flexDirection: 'row', justifyContent: 'space-between' },
	itemWrapper: {  borderRadius: sizes.xs, width: '48%' },
	itemWrapperActive: { ...shadows.cardActive, backgroundColor: colors.green },
	itemWrapperNormal: { ...shadows.card, backgroundColor: colors.white },
	itemInner: { padding: sizes.xs, borderRadius: sizes.xs },
	itemInnerActive: { backgroundColor: colors.green },
	itemInnerNormal: { backgroundColor: colors.white },
})