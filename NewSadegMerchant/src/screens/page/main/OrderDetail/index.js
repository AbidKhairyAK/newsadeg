import React, { useRef } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { BaseHeader, OrderItem } from '@/components'

import DetailSection from './sections/DetailSection'
import FormSection from './sections/FormSection'
import ActionSection from './sections/ActionSection'

const OrderDetail = ({ route }) => {
	const scrollViewRef = useRef()
	const { order } = route.params

	return <>
		<ScrollView ref={scrollViewRef} style={styles.container}>
			<BaseHeader title={'CODE: ' + order.order_code} withBack/>
			<OrderItem withDate order={order} />
			<DetailSection order={order} />
			<FormSection order={order} />
		</ScrollView>
		<ActionSection scrollViewRef={scrollViewRef} />
	</>
}

export default OrderDetail

const styles = StyleSheet.create({
	container: { flex: 1 },
})