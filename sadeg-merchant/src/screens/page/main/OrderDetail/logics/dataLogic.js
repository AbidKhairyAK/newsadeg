import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { OrderService } from '@/services'
import { getNewOrders, getPastOrders } from '@/store/orders'

const dataLogic = ({ orderId, orderType }) => {
	const dispatch = useDispatch()
	const { goBack } = useNavigation()

	const order = useSelector(state => state.orders[orderType]?.data.find(item => item.id === orderId) || {})

	const [cookingTime, setCookingTime] = useState()
	const [isLoading, setIsLoading] = useState({
		reject: false,
		accept: false
	})

	const changeCookingTime = time => e => setCookingTime(time)
	const changeLoading = (type, status) => setIsLoading(prev => ({ ...prev, [type]: status }))

	const rejectOrder = async () => {
		try {
			changeLoading('reject', true)
			await OrderService.cancel(orderId)
			await OrderService.update(orderId, { status: 'canceled' })
			dispatch(getNewOrders())
			dispatch(getPastOrders())
			goBack()
		} catch (err) {
			console.error(err)
			changeLoading('reject', false)
		}
	}

	return {
		order,
		isLoading,
		cookingTime,
		changeCookingTime,
		rejectOrder
	}
}

export default dataLogic