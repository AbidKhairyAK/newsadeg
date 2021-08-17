import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { sizes } from '@/constants'

import TypeItem from '../components/TypeItem'


const TypesSection = ({ orderTypes, selectedType, changeType }) => {
	return (
		<View style={styles.container}>
			{Object.keys(orderTypes).map(type => 
				<TypeItem
					key={type}
					title={orderTypes[type]}
					isSelected={selectedType === type}
					onPress={changeType(type)}
				/>
			)}
		</View>
	)
}

export default TypesSection

const styles = StyleSheet.create({
	container: { marginBottom: sizes.base, marginHorizontal: sizes.base, flexDirection: 'row', justifyContent: 'space-between' },
})