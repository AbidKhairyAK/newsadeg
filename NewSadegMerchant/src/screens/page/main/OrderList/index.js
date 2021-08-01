import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { BaseHeader } from '@/components'

import TypesSection from './sections/TypesSection'
import ListSection from './sections/ListSection'

const OrderList = () => {
	return (
		<ScrollView style={styles.container}>
			<BaseHeader title="ORDER LIST" />
			<TypesSection />
			<ListSection />
		</ScrollView>
	)
}

export default OrderList

const styles = StyleSheet.create({
	container: { flex: 1 },
})