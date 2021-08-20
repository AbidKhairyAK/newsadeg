import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { OrderItem } from '@/components'
import { colors } from '@/constants'

const ListSection = ({ orders, isLoading }) => {
	const navigation = useNavigation()
	const toDetail = () => navigation.navigate('OrderDetail')

	return <>
		{orders.map(item =>
			<OrderItem 
				key={item.id}
				onPress={toDetail} 
				withTotal
			/>
		)}
		{isLoading && <ActivityIndicator color={colors.green} />}
	</>
}

export default ListSection