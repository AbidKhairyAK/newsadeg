import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { BaseHeader } from '@/components'

import fetchLogic from './logics/fetchLogic'
import CategoriesSection from './sections/CategoriesSection'
import ListSection from './sections/ListSection'
import ActionSection from './sections/ActionSection'

const Menu = () => {
	const { menus, categories, selectedCategory, changeCategory } = fetchLogic()

	return (
		<View style={styles.container}>
			<ScrollView style={styles.container}>
				<BaseHeader title="MENU" />
				<CategoriesSection
					categories={categories}
					selectedCategory={selectedCategory}
					changeCategory={changeCategory}
				/>
				<ListSection menus={menus} />
			</ScrollView>

			<ActionSection />
		</View>
	)
}

export default Menu

const styles = StyleSheet.create({
	container: { flex: 1 },
})