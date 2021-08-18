import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { RestaurantCollection } from '@/services'
import { getNewOrders } from '@/store/orders'

const subscribeLogic = () => {
	const dispatch = useDispatch()

	const [ordersCount, setOrdersCount] = useState(0)

	const handleNewOrder = res => {
		dispatch(getNewOrders())
	}

	const onSnapshot = res => {
		console.log('snapshot orders', res)

		setOrdersCount(prevLength => {
			const currentLength = res._docs?.length || 0
			if (prevLength !== 0 && currentLength > prevLength) handleNewOrder(res)

			return currentLength
		})
	}

	useEffect(() => {
		const unsubscribe = RestaurantCollection.subscribeOrders(onSnapshot)
		return unsubscribe
	}, [])
}

export default subscribeLogic