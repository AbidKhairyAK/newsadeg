import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { BaseHeader } from '@/components'

import CategoriesSection from './sections/CategoriesSection'
import ListSection from './sections/ListSection'

const Menu = () => {
	return (
		<ScrollView style={styles.container}>
			<BaseHeader title="MENU" />
			<CategoriesSection />
			<ListSection />
		</ScrollView>
	)
}

export default Menu

const styles = StyleSheet.create({
	container: { flex: 1 },
})