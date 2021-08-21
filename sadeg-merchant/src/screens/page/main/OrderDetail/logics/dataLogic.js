import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message'

import { OrderService, RestaurantCollection, RestaurantDriverCollection , DriverCollection} from '@/services'
import { getRestaurant } from '@/helpers'
import { resetOrders, getNewOrders, updateNewOrder } from '@/store/orders'

// const MAX_CHECK_TIME = 120 // 2 minutes
const MAX_CHECK_TIME = 10

const dataLogic = ({ orderId, orderType }) => {
	const dispatch = useDispatch()
	const { goBack, navigate } = useNavigation()

	const order = useSelector(state => state.orders[orderType]?.data.find(item => item.id === orderId) || {})

	const [isStartChecking, setIsStartChecking] = useState(false)
	const [searchDriverLoading, setSearchDriverLoading] = useState(false)
	const [requestedDrivers, setRequestedDrivers] = useState([])

	const [driverType, setDriverType] = useState()
	const [cookingTime, setCookingTime] = useState()

	const [isLoading, setIsLoading] = useState({
		negative: false,
		positive: false,
	})

	const changeDriverType = type => e => setDriverType(type)
	const changeCookingTime = time => e => setCookingTime(time)
	const changeLoading = (type, status) => setIsLoading(prev => ({ ...prev, [type]: status }))

	const requestToNearbyDriver = async () => {
		try {
			setSearchDriverLoading('Looking for nearby partner driver')

			const drivers = await DriverCollection.getActiveDrivers()

			drivers.docs
				.sort((a, b) => parseFloat(a._data.distance) - parseFloat(b._data.distance))
				.splice(10)

			setRequestedDrivers(drivers.docs)
			console.log('selected driver', drivers.docs.map(driver => driver.id))
			
			setSearchDriverLoading('Sending request to ' + (drivers.docs.length + 1) + ' nearby drivers')

			await DriverCollection.sendDeliveryRequests(drivers, orderId, {
				id: orderId,
				restaurant_id: getRestaurant().id
			})

			// await Promise.all(drivers.docs.map(driver =>
			// 	DriverCollection.setOrder(driver._data.id, orderId, {
			// 		id: orderId,
			// 		restaurant_id: getRestaurant().id
			// 	})
			// ))

			setSearchDriverLoading('Waiting for driver to accept the delivery request')
			setIsStartChecking(true)
		} catch (err) {
			console.error(err)
		}
	}

	const stopSearchDriver = (isSuccess = false) => {
		if (!searchDriverLoading && !isStartChecking) return
		setSearchDriverLoading(false)
		setIsStartChecking(false)
		if (isSuccess) {
			showMessage({
				message: 'a driver has been accepted the request',
				type: 'success',
				icon: 'success'
			})
		} else {
			showMessage({
				message: 'no nearby driver accepted the request',
				type: 'danger',
				icon: 'danger'
			})
		}
	}

	const updateOrderDatabase = (driverId, status) => {
		const newData = {
			estimated_cooking: cookingTime,
			status
		}
		if (order.order_method === 'delivery') {
			newData.driver_type = driverType
			newData.user_driver_id = driverId
		}
		return OrderService.update(orderId, newData)
	}

	const updateOrderCollection = (driverId, status) => {
		const restaurantOrderData = {
			order_status: status
		}
		if (order.order_method === 'delivery') {
			restaurantOrderData.driver_id = driverId
			restaurantOrderData.driver_type = driverType
		}
		return RestaurantCollection.setOrder(orderId, restaurantOrderData)
	}

	const updateDriverCollection = (driverId, status) => {
		if (order.order_method === 'takeaway') return Promise.resolve()
		
		const collectionsMap = {
			driver_restaurant: RestaurantDriverCollection,
			driver_partner: DriverCollection,
		}
		Collection = collectionsMap[driverType]

		return Collection.setOrder(driverId, orderId, {
			id: orderId,
			order_status: status
		})
	}

	const processOrder = async (driverId, status = 'process') => {
		try {
			changeLoading('positive', true)

			const newData = await updateOrderDatabase(driverId, status)
			await updateOrderCollection(driverId, status)
			await updateDriverCollection(driverId, status)

			dispatch(updateNewOrder({
				id: orderId,
				data: newData
			}))
		} catch (err) {
			console.error(err)
		} finally {
			changeLoading('positive', false)
		}
	}

	const acceptOrder = () => {
		if (order.order_method === 'takeaway') processOrder()
		else if (driverType === 'driver_restaurant') navigate('DriverSelection', { onSelectDriver: processOrder })
		else if (driverType === 'driver_partner') requestToNearbyDriver()
	}

	const rejectOrder = async () => {
		try {
			changeLoading('negative', true)
			await OrderService.cancel(orderId)
			await OrderService.update(orderId, { status: 'canceled' })
			dispatch(resetOrders())

			setTimeout(() => { // next tick
				goBack()
			}, 0)
		} catch (err) {
			console.error(err)
			changeLoading('negative', false)
		}
	}

	useEffect(() => {
		if (!isStartChecking) return

		const unsubscribe = RestaurantCollection.subscribeDriversSorter(
			orderId,
			async res => {
				console.log('sorter', res)

				if (res.size === 1) {
					stopSearchDriver(true)
					await processOrder(res.docs[0]._data.id)
				}
			},
			err => {
				console.error(err)
				stopSearchDriver()
			}
		)

		let intervalCount = 0
		const intervalId = setInterval(() => {
			intervalCount++
			stopSearchDriver()
			if (intervalCount >= MAX_CHECK_TIME) clearInterval(intervalId)
		}, 1000)

		return () => {
			unsubscribe()
			clearInterval(intervalId)
		}
	}, [isStartChecking])

	return {
		order,
		isLoading,
		searchDriverLoading,
		driverType,
		changeDriverType,
		cookingTime,
		changeCookingTime,
		rejectOrder,
		acceptOrder,
		processOrder
	}
}

export default dataLogic