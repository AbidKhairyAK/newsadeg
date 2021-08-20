import React, { useRef } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { BaseHeader, OrderItem } from '@/components'

import dataLogic from './logics/dataLogic'
import DetailSection from './sections/DetailSection'
import AdditionalDetailSection from './sections/AdditionalDetailSection'
import FormSection from './sections/FormSection'
import ActionSection from './sections/ActionSection'

const OrderDetail = ({ route }) => {
	const scrollViewRef = useRef()
	const { orderId, orderType } = route.params

	const { 
		isLoading,
		order,
		driverType,
		changeDriverType,
		cookingTime, 
		changeCookingTime,
		rejectOrder,
		acceptOrder
	} = dataLogic({
		orderId,
		orderType
	})

	return <>
		<ScrollView ref={scrollViewRef} style={styles.container}>
			<BaseHeader title={'CODE: ' + order.order_code} withBack/>
			<OrderItem withDate order={order} />
			<DetailSection order={order} />
			{ order.status === 'waiting'
				? <FormSection
					order={order}
					driverType={driverType}
					cookingTime={cookingTime}
					changeDriverType={changeDriverType}
					changeCookingTime={changeCookingTime}
				/>
				: <AdditionalDetailSection order={order} />
			}
		</ScrollView>
		<ActionSection
			isLoading={isLoading}
			scrollViewRef={scrollViewRef}
			driverType={driverType}
			cookingTime={cookingTime}
			rejectOrder={rejectOrder}
			acceptOrder={acceptOrder}
		/>
	</>
}

export default OrderDetail

const styles = StyleSheet.create({
	container: { flex: 1 },
})