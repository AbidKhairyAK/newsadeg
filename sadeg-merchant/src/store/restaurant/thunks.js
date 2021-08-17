import { createAsyncThunk } from '@reduxjs/toolkit'

import { RestaurantService } from '@/services'

export const getRestaurantData = createAsyncThunk(
	'restaurant/getRestaurantData',
	async (accessToken, { dispatch }) => {
		const res = await RestaurantService.getProfile(accessToken)
		dispatch({ type: 'restaurant/setRestaurantData', payload: res })
		return res
	}
)