import { createAsyncThunk } from '@reduxjs/toolkit'

import { RestaurantCollection } from '@/services'

export const subscribeOrderList = createAsyncThunk(
	'event/subscribeOrderList',
	(onSnapshot, { getState }) => {
		if (getState().event.unsubscribers.orderList) return

		const unsubscribe = RestaurantCollection.subscribeOrders(onSnapshot)
		return {
			name: 'orderList',
			function: unsubscribe
		}
	}
)