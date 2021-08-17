import React from 'react'
import { ScrollView, StyleSheet, LogBox, FlatList, ActivityIndicator } from 'react-native'

import { BaseHeader, OrderItem, NoData } from '@/components'
import { colors } from '@/constants'
import DonutIllustration from '@/assets/illustrations/donut.svg'

import subscribeLogic from './logics/subscribeLogic'
import fetchLogic from './logics/fetchLogic'
import TypesSection from './sections/TypesSection'
import ListSection from './sections/ListSection'

LogBox.ignoreLogs(['This synthetic event is reused']);

const OrderList = () => {
	const { isLoading, orderTypes, selectedType, changeType, orders, getNextPage, getOrderList, toOrderDetail } = fetchLogic()
	
	subscribeLogic()

	return (
		<FlatList
			style={styles.container}
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
					orderTypes={orderTypes}
					selectedType={selectedType}
					changeType={changeType}
				/>
			</>}
			renderItem={({ item, index }) =>
				<OrderItem onPress={toOrderDetail({ order: item })} order={item} withTotal withDate={selectedType === 'past'} />
			}
			ListEmptyComponent={!isLoading &&
				<NoData
					illustration={DonutIllustration}
					title="No order found"
					description="Wait for a new order or create a menu if you haven't"
				/>
			}
		/>
	)
}

export default OrderList

const styles = StyleSheet.create({
	container: { flex: 1 },
})