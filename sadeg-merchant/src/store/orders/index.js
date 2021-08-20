import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes, getLoadingStatus } from '@/store/helpers'
import { logout } from '@/store/auth'

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

const getStateName = action => {
	const stateMap = {
		getNewOrders: 'new',
		getPastOrders: 'past',
	}
	return stateMap[action.type.split('/')[1]]
}

const slice = createSlice({
	name: 'orders',
	initialState: { ...initialState },
	reducers: {
		resetOrders () {
			return { ...initialState }
		},
		setNewOrders (state, action) {
			state.new = action.payload
		},
		updateNewOrder (state, action) {
			const index = state.new.data.findIndex(item => item.id == action.payload.id)
			if (index > -1) state.new.data[index] = {
				...state.new.data[index], 
				...action.payload.data 
			}
		},
		setPastOrders (state, action) {
			state.past = action.payload
		},
	},
	extraReducers: builder => { builder
		.addCase(logout.fulfilled, () => ({ ...initialState }))
		.addMatcher(
			isActionIncludes([getNewOrders.fulfilled, getPastOrders.fulfilled]),
			(state, action) => { state[getStateName(action)] = action.payload }
		)
		.addMatcher(
			isActionIncludes([
				getNewOrders.pending, getNewOrders.fulfilled, getNewOrders.rejected, 
				getPastOrders.pending, getPastOrders.fulfilled, getPastOrders.rejected
			]),
			(state, action) => { state.isLoading = getLoadingStatus(action) }
		)
	}
})

export * from './thunks'

export const { resetOrders, setNewOrders, updateNewOrder, setPastOrders } = slice.actions

export default slice.reducer