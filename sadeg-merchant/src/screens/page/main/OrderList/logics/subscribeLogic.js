import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'

import { getNewOrders, getPastOrders } from '@/store/orders'
import { RestaurantCollection } from '@/services'

const subscribeLogic = () => {
	const dispatch = useDispatch()
	const { navigate } = useNavigation()

	const [ordersCount, setOrdersCount] = useState(0)

	const showNewOrderMessage = res => {
		showMessage({
			message: 'You have new order!',
			description: 'Click here to go to the order list.',
			icon: 'info',
			type: 'success',
			duration: 10000,
			onPress: () => navigate('OrderList')
		})
	}

	const onSnapshot = res => {
		console.log('snapshot orders', res)

		setOrdersCount(prevLength => {
			const currentLength = res._docs?.length || res.docs?.length || 0

			if (currentLength > 0) { 
				console.log('re get order')
				dispatch(getNewOrders())
				dispatch(getPastOrders())
			}
			if (prevLength !== 0 && currentLength > prevLength) showNewOrderMessage(res)

			return currentLength
		})
	}

	useEffect(() => {
		const unsubscribe = RestaurantCollection.subscribeOrders(onSnapshot)
		return unsubscribe
	}, [])
}

export default subscribeLogic