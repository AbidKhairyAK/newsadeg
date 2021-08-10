import { createAsyncThunk } from '@reduxjs/toolkit'

import { RestaurantService } from '@/services'

export const getRestaurantData = createAsyncThunk(
	'restaurant/getRestaurantData',
	async (payload, { dispatch }) => {
		const res = await RestaurantService.getData()
		dispatch({ type: 'restaurant/setRestaurantData', payload: res })
	}
)