import React, { useRef } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { BaseHeader, OrderItem } from '@/components'

import dataLogic from './logics/dataLogic'
import DetailSection from './sections/DetailSection'
import AdditionalDetailSection from './sections/AdditionalDetailSection'
import FormSection from './sections/FormSection'
import ActionSection from './sections/ActionSection'
import LoadingOverlay from './sections/LoadingOverlay'

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
		acceptOrder,
		processOrder,
		searchDriverLoading
	} = dataLogic({
		orderId,
		orderType
	})

	return <>
		<ScrollView ref={scrollViewRef} style={styles.container}>
			<BaseHeader 
				title={'CODE: ' + order.order_code + (__DEV__ ? (' - ' + orderId) : '')} 
				withBack
			/>
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
			scrollViewRef={scrollViewRef}
			isLoading={isLoading}
			order={order}
			driverType={driverType}
			cookingTime={cookingTime}
			rejectOrder={rejectOrder}
			acceptOrder={acceptOrder}
			processOrder={processOrder}
		/>
		<LoadingOverlay loading={searchDriverLoading} />
	</>
}

export default OrderDetail

const styles = StyleSheet.create({
	container: { flex: 1 },
})