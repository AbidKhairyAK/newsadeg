import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { sizes } from '@/constants'

import TypeItem from '../components/TypeItem'

const types = {
	process: 'On Process',
	history: 'History'
}

const TypesSection = () => {
	const [selected, setSelected] = useState('process')

	const changeSelected = type => e => setSelected(type)

	return (
		<View style={styles.container}>
			{Object.keys(types).map(type => 
				<TypeItem
					key={type}
					title={types[type]}
					isSelected={selected === type}
					onPress={changeSelected(type)}
				/>
			)}
		</View>
	)
}

export default TypesSection

const styles = StyleSheet.create({
	container: { marginBottom: sizes.base, marginHorizontal: sizes.base, flexDirection: 'row', justifyContent: 'space-between' },
})