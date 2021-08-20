import { createAsyncThunk } from '@reduxjs/toolkit'

import { OrderService } from '@/services'

const formatPayload = (res, prev, page) => ({ 
	...res,
	data: prev.data && page !== 1 
		? [...prev.data, ...res.data] 
		: res.data 
})

export const getNewOrders = createAsyncThunk(
	'orders/getNewOrders',
	async (page = 1, { getState }) => {
		try {
			const res = await OrderService.getList('new', page)
			const prev = getState().orders.new

			return formatPayload(res, prev, page)
		} catch (err) {
			console.log(err)
			throw err
		}
	}
)

export const getPastOrders = createAsyncThunk(
	'orders/getPastOrders',
	async (page = 1, { getState }) => {
		try {
			const res = await OrderService.getList('past', page)
			const prev = getState().orders.past

			return formatPayload(res, prev, page)
		} catch (err) {
			console.log(err)
			throw err
		}
	}
)