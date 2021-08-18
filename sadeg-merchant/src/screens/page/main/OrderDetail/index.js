import React, { useRef } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { BaseHeader, OrderItem } from '@/components'

import dataLogic from './logics/dataLogic'
import DetailSection from './sections/DetailSection'
import FormSection from './sections/FormSection'
import ActionSection from './sections/ActionSection'

const OrderDetail = ({ route }) => {
	const scrollViewRef = useRef()
	const { orderId, orderType } = route.params

	const { 
		isLoading,
		order,
		cookingTime, 
		changeCookingTime,
		rejectOrder
	} = dataLogic({
		orderId,
		orderType
	})

	return <>
		<ScrollView ref={scrollViewRef} style={styles.container}>
			<BaseHeader title={'CODE: ' + order.order_code} withBack/>
			<OrderItem withDate order={order} />
			<DetailSection order={order} />
			<FormSection 
				order={order}
				cookingTime={cookingTime}
				changeCookingTime={changeCookingTime}
			/>
		</ScrollView>
		<ActionSection
			isLoading={isLoading}
			scrollViewRef={scrollViewRef}
			cookingTime={cookingTime}
			rejectOrder={rejectOrder}
		/>
	</>
}

export default OrderDetail

const styles = StyleSheet.create({
	container: { flex: 1 },
})