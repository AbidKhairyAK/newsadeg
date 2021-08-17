import React, { useState, useEffect } from 'react'
import { throttle } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from 'validate.js'

import { OrderService } from '@/services'
import { getCurrentOrders, getHistoryOrders } from '@/store/orders'

const orderTypes = {
	new: 'Current',
	past: 'History'
}

const fetchLogic = () => {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const { 
		isLoading, 
		current: currentOrders, 
		history: historyOrders 
	} = useSelector(state => state.orders)

	const [selectedType, setSelectedType] = useState('new')

	const ordersMap = {
		new: currentOrders,
		past: historyOrders
	}
	const getOrdersMap = {
		new: getCurrentOrders,
		past: getHistoryOrders,
	}

	const getOrdersByType = getOrdersMap[selectedType]
	const rawOrders = ordersMap[selectedType]
	const orders = rawOrders.data

	const changeType = type => e => setSelectedType(type)

	const toOrderDetail = params => e => navigation.navigate('OrderDetail', params)

	const getOrderList = (page = 1) => {
		if (page === 1 && !isEmpty(orders)) return
		console.log('fetching data')
		dispatch(getOrdersByType(page))
	}

	const getNextPage = ({ distanceFromEnd: distance }) => {
		const triggerDistance = distance > 0 && distance < 200
		const notLastPage = rawOrders.current_page !== rawOrders.last_page

		if (triggerDistance && notLastPage && !isLoading) {
			getOrderList(rawOrders.current_page + 1)
		}
	}

	useEffect(() => {
		getOrderList()
	}, [selectedType])

	return { isLoading, orderTypes, selectedType, changeType, orders, getNextPage, getOrderList, toOrderDetail }
}

export default fetchLogic


// const handleScroll = throttle(({ nativeEvent }) => {
// 	const contentHeight = nativeEvent?.contentSize.height || 0
// 	const layoutHeight = nativeEvent?.layoutMeasurement.height || 0
// 	const offsetY = nativeEvent?.contentOffset.y || 0
// 	const triggerFetch = contentHeight - ( layoutHeight + offsetY ) < layoutHeight * 0.5

// 	// console.log({ contentHeight, layoutHeight, offsetY, trigger })
// 	if (triggerFetch && !isLoading && rawOrders.current_page !== rawOrders.last_page) {
// 		getOrderList(rawOrders.current_page + 1)
// 	}
// }, 100, { leading: true, trailing: true })
