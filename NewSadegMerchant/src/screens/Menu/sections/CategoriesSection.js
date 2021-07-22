import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'

import { BaseText, ShadowView } from '@/components'
import { sizes } from '@/constants'

import CategoryItem from '../components/CategoryItem'

const categories = {
	food: 'Food',
	beverage: 'Beverage',
	dessert: 'Dessert',
	snack: 'Snack',
	misc: 'Misc'
}

const CategoriesSection = () => {
	const [selected, setSelected] = useState(Object.keys(categories)[0])

	const changeSelected = val => e => setSelected(val)

	return (
		<ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
			{Object.keys(categories).map((category, index) =>
				<CategoryItem 
					key={category}
					name={categories[category]} 
					firstItem={index === 0} 
					onPress={changeSelected(category)}
					selected={selected === category}
				/>
			)}

			<CategoryItem 
				name="+ New Category" 
				asAction
			/>
		</ScrollView>
	)
}

export default CategoriesSection

const styles = StyleSheet.create({
	container: { flex: 1, marginTop: sizes.xs * -1 / 2 },
})