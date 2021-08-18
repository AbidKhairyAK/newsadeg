import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes } from '@/store/helpers'

import { getNewOrders, getPastOrders } from './thunks'

const initialState = {
	isLoading: false,
	new: {
		data: []
	},
	past: {
		data: []
	}
}

const slice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		resetOrders () {
			return { ...initialState }
		},
		setNewOrders (state, action) {
			state.new = action.payload
		},
		setPastOrders (state, action) {
			state.past = action.payload
		},
	},
	extraReducers: builder => { builder
		.addMatcher(
			isActionIncludes([getNewOrders.pending, getPastOrders.pending]),
			state => {
				state.isLoading = true
			}
		)
		.addMatcher(
			isActionIncludes([getNewOrders.rejected, getNewOrders.fulfilled, getPastOrders.rejected, getPastOrders.fulfilled]),
			state => {
				state.isLoading = false
			}
		)
	}
})

export * from './thunks'

export const { resetOrders, setNewOrders, setPastOrders } = slice.actions

export default slice.reducer