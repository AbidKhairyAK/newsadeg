import React from 'react'
import { ScrollView, StyleSheet, LogBox, FlatList, ActivityIndicator } from 'react-native'

import { BaseHeader, OrderItem } from '@/components'
import { colors } from '@/constants'

import fetchLogic from './logics/fetchLogic'
import TypesSection from './sections/TypesSection'
import ListSection from './sections/ListSection'

LogBox.ignoreLogs(['This synthetic event is reused']);

const OrderList = () => {
	const { isLoading, types, selectedType, changeType, orders, getNextPage, getOrderList, toOrderDetail } = fetchLogic()

	return (
		<FlatList
			refreshing={isLoading}
			scrollEnabled={!isLoading}
			onRefresh={getOrderList}
			onEndReached={getNextPage}
			onEndReachedThreshold={0.2}
			data={orders}
			keyExtractor={item => item.id}
			ListHeaderComponent={<>
				<BaseHeader title="ORDER LIST" />
				<TypesSection
					types={types}
					selectedType={selectedType}
					changeType={changeType}
				/>
			</>}
			renderItem={({ item, index }) =>
				<OrderItem onPress={toOrderDetail({ order: item })} order={item} withTotal />
			}
		/>
	)
}

export default OrderList

const styles = StyleSheet.create({
	container: { flex: 1 },
})