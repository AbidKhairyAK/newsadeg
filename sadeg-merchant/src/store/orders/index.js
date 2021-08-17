import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes } from '@/store/helpers'

import { getCurrentOrders, getHistoryOrders } from './thunks'

const initialState = {
	isLoading: false,
	current: {
		data: []
	},
	history: {
		data: []
	}
}

const slice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setCurrentOrders (state, action) {
			state.current = action.payload
		},
		setHistoryOrders (state, action) {
			state.history = action.payload
		},
	},
	extraReducers: builder => { builder
		.addMatcher(
			isActionIncludes([getCurrentOrders.pending, getHistoryOrders.pending]),
			state => {
				state.isLoading = true
			}
		)
		.addMatcher(
			isActionIncludes([getCurrentOrders.rejected, getCurrentOrders.fulfilled, getHistoryOrders.rejected, getHistoryOrders.fulfilled]),
			state => {
				state.isLoading = false
			}
		)
	}
})

export * from './thunks'

export const { setCurrentOrders, setHistoryOrders } = slice.actions

export default slice.reducer