import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { BaseHeader } from '@/components'

import CategoriesSection from './sections/CategoriesSection'
import ListSection from './sections/ListSection'
import ActionSection from './sections/ActionSection'

const Menu = () => {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<BaseHeader title="MENU" />
				<CategoriesSection />
				<ListSection />
			</ScrollView>

			<ActionSection />
		</View>
	)
}

export default Menu

const styles = StyleSheet.create({
	container: { flex: 1 },
})