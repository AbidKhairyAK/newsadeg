import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { OrderItem } from '@/components'

const ListSection = () => {
	const navigation = useNavigation()
	const toDetail = () => navigation.navigate('OrderDetail')

	return <>
		<OrderItem onPress={toDetail} withTotal />
		<OrderItem onPress={toDetail} withTotal />
		<OrderItem onPress={toDetail} withTotal />
		<OrderItem onPress={toDetail} withTotal />
	</>
}

export default ListSection