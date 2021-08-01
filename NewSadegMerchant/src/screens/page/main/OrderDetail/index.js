import React, { useRef } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { BaseHeader, OrderItem } from '@/components'

import DetailSection from './sections/DetailSection'
import FormSection from './sections/FormSection'
import ActionSection from './sections/ActionSection'

const OrderDetail = () => {
	const scrollViewRef = useRef()

	return <>
		<ScrollView ref={scrollViewRef} style={styles.container}>
			<BaseHeader title="ORDER A234SD91" withBack/>
			<OrderItem withDate />
			<DetailSection />
			<FormSection />
		</ScrollView>
		<ActionSection scrollViewRef={scrollViewRef} />
	</>
}

export default OrderDetail

const styles = StyleSheet.create({
	container: { flex: 1 },
})