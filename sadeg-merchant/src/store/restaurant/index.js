import { createSlice } from '@reduxjs/toolkit'

import { getRestaurantData } from './thunks'

const slice = createSlice({
	name: 'restaurant',
	initialState: {},
	reducers: {
		setRestaurantData (state, action) {
			return action.payload
		}
	},
	extraReducers: builder => { builder
		.addCase(getRestaurantData.fulfilled, (state, action) => action.payload)
	}
})

export * from './thunks'

export const { setRestaurantData } = slice.actions

export default slice.reducer