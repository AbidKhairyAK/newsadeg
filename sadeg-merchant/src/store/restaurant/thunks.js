import { createAsyncThunk } from '@reduxjs/toolkit'

import { RestaurantService } from '@/services'

export const getRestaurantData = createAsyncThunk(
	'restaurant/getRestaurantData',
	async (accessToken) => {
		const res = await RestaurantService.getProfile(accessToken)
		return res
	}
)