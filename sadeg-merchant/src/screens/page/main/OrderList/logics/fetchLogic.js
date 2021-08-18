import React, { useState, useCallback } from 'react'
import { throttle } from 'lodash'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from 'validate.js'

import { OrderService } from '@/services'
import { getNewOrders, getPastOrders, resetOrders } from '@/store/orders'

const orderTypes = {
	new: 'Current',
	past: 'History'
}

const fetchLogic = () => {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const { 
		isLoading, 
		new: newOrders,
		past: pastOrders
	} = useSelector(state => state.orders)

	const [selectedType, setSelectedType] = useState('new')

	const ordersMap = {
		new: newOrders,
		past: pastOrders
	}
	const getOrdersMap = {
		new: getNewOrders,
		past: getPastOrders,
	}

	const getOrdersByType = getOrdersMap[selectedType]
	const rawOrders = ordersMap[selectedType]
	const orders = rawOrders.data

	const changeType = type => e => setSelectedType(type)

	const toOrderDetail = (orderId, orderType) => e => navigation.navigate('OrderDetail', { orderId, orderType })

	const getOrderList = (page = 1) => {
		dispatch(getOrdersByType(page))
	}

	const getNextPage = ({ distanceFromEnd: distance }) => {
		const triggerDistance = distance > 0 && distance < 200
		const notLastPage = rawOrders.current_page !== rawOrders.last_page

		if (triggerDistance && notLastPage && !isLoading) {
			getOrderList(rawOrders.current_page + 1)
		}
	}

	useFocusEffect(
		useCallback(() => {
			if (isEmpty(orders)) getOrderList()
		}, [selectedType, orders.length])
	)

	return { isLoading, orderTypes, selectedType, changeType, orders, getNextPage, getOrderList, toOrderDetail }
}

export default fetchLogic
