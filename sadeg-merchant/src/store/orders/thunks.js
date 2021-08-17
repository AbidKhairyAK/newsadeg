import { createAsyncThunk } from '@reduxjs/toolkit'

import { OrderService } from '@/services'

const formatPayload = (res, prev, page) => ({ 
	...res,
	data: prev.data && page !== 1 
		? [...prev.data, ...res.data] 
		: res.data 
})

export const getCurrentOrders = createAsyncThunk(
	'orders/getCurrentOrders',
	async (page = 1, { dispatch, getState }) => {
		try {
			const res = await OrderService.getList('new', page)
			const prev = getState().orders.current

			dispatch({ type: 'orders/setCurrentOrders', payload: formatPayload(res, prev, page) })
		} catch (err) {
			console.log(err)
		}
	}
)

export const getHistoryOrders = createAsyncThunk(
	'orders/getHistoryOrders',
	async (page = 1, { dispatch, getState }) => {
		try {
			const res = await OrderService.getList('past', page)
			const prev = getState().orders.history

			dispatch({ type: 'orders/setHistoryOrders', payload: formatPayload(res, prev, page) })
		} catch (err) {
			console.log(err)
		}
	}
)