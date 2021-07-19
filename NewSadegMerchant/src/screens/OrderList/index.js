import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { BaseHeader } from '@/components'

import OrderItem from './OrderItem'
import OrderType from './OrderType'

const OrderList = () => {
	return (
		<ScrollView style={styles.container}>
			<BaseHeader title="ORDER LIST" />

			<OrderType />

			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />

		</ScrollView>
	)
}

export default OrderList

const styles = StyleSheet.create({
	container: { flex: 1 },
})