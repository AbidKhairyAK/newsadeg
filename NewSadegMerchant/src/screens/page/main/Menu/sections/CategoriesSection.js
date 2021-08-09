import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { BaseText, ShadowView } from '@/components'
import { sizes, colors } from '@/constants'

import CategoryItem from '../components/CategoryItem'

const CategoriesSection = ({ isLoading, categories, selectedCategory, changeCategory }) => {
	const { navigate } = useNavigation()
	const toCategorySetting = () => navigate('CategorySetting')

	return isLoading
	? <ActivityIndicator color={colors.green} />
	: (
		<ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
			{categories.map((category, index) =>
				<CategoryItem 
					key={category.id}
					name={category.name} 
					firstItem={index === 0} 
					onPress={changeCategory(category)}
					selected={selectedCategory.id === category.id}
				/>
			)}

			<CategoryItem 
				name="+ New Category" 
				asAction
				onPress={toCategorySetting}
			/>
		</ScrollView>
	)
}

export default CategoriesSection

const styles = StyleSheet.create({
	container: { flex: 1, marginTop: sizes.xs * -1 },
})