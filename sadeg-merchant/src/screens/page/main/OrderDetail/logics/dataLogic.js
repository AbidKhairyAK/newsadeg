import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { OrderService, RestaurantCollection, RestaurantDriverCollection } from '@/services'
import { getRestaurant } from '@/helpers'
import { resetOrders, getNewOrders, updateNewOrder } from '@/store/orders'

const dataLogic = ({ orderId, orderType }) => {
	const dispatch = useDispatch()
	const { goBack, navigate } = useNavigation()

	const order = useSelector(state => state.orders[orderType]?.data.find(item => item.id === orderId) || {})

	const [driverType, setDriverType] = useState()
	const [cookingTime, setCookingTime] = useState()
	const [selectedDriver, setSelectedDriver] = useState() 
	const [isLoading, setIsLoading] = useState({
		reject: false,
		accept: false
	})

	const changeDriverType = type => e => setDriverType(type)
	const changeCookingTime = time => e => setCookingTime(time)
	const changeLoading = (type, status) => setIsLoading(prev => ({ ...prev, [type]: status }))

	const handleDriverRestaurant = async driverId => {
		try {
			changeLoading('accept', true)

			const newData = {
				estimated_cooking: cookingTime,
				driver_type: driverType,
				user_driver_id: driverId,
				status: 'process'
			}

			await OrderService.update(order.id, newData)

			await RestaurantCollection.updateOrder(order.id, {
				order_status: 'process',
				driver_id: driverId,
				driver_type: driverType
			})

			await RestaurantDriverCollection.updateOrder(driverId, order.id, {
				order_status: 'process'
			})

			dispatch(updateNewOrder({
				id: orderId,
				data: newData
			}))
		} catch (err) {
			console.error(err)
		} finally {
			changeLoading('accept', false)
		}
	}

	const acceptOrder = () => {
		if (driverType === 'driver_restaurant') navigate('DriverSelection', { onSelectDriver: handleDriverRestaurant })
		else if (driverType === 'driver_partner') alert('select driver partner')
	}

	const rejectOrder = async () => {
		try {
			changeLoading('reject', true)
			await OrderService.cancel(orderId)
			await OrderService.update(orderId, { status: 'canceled' })
			dispatch(resetOrders())

			setTimeout(() => { // next tick
				goBack()
			}, 0)
		} catch (err) {
			console.error(err)
			changeLoading('reject', false)
		}
	}

	return {
		order,
		isLoading,
		driverType,
		changeDriverType,
		cookingTime,
		changeCookingTime,
		rejectOrder,
		acceptOrder
	}
}

export default dataLogic