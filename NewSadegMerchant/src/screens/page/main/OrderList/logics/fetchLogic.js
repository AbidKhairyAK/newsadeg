import React, { useState, useEffect } from 'react'
import { throttle } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { OrderService } from '@/services'

const types = {
	new: 'On Process',
	past: 'History'
}

const fetchLogic = () => {
	const navigation = useNavigation()

	const [isLoading, setIsLoading] = useState(false)
	const [selectedType, setSelectedType] = useState('new')
	const [rawOrders, setRawOrders] = useState({})

	const orders = rawOrders.data || []

	const changeType = type => e => setSelectedType(type)

	const getOrderList = async (page = 1) => {
		try {
			setIsLoading(true)
			const res = await OrderService.getList(selectedType, page)
			setRawOrders(prev => ({ 
				...res,
				data: prev.data && page !== 1 
					? [ ...prev.data, ...res.data ] 
					: res.data 
			}))
		} catch {} finally {
			setIsLoading(false)
		}
	}

	const getNextPage = ({ distanceFromEnd: distance }) => {
		const triggerDistance = distance > 0 && distance < 200
		const notLastPage = rawOrders.current_page !== rawOrders.last_page

		if (triggerDistance && notLastPage && !isLoading) {
			getOrderList(rawOrders.current_page + 1)
		}
	}

	const toOrderDetail = params => e => navigation.navigate('OrderDetail', params)

	useEffect(() => {
		setRawOrders({})
		getOrderList()
	}, [selectedType])

	return { isLoading, types, selectedType, changeType, orders, getNextPage, getOrderList, toOrderDetail }
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
