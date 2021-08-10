import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'restaurant',
	initialState: {},
	reducers: {
		setRestaurantData (state, action) {
			return action.payload
		}
	}
})

export * from './thunks'

export const { setRestaurantData } = slice.actions

export default slice.reducer