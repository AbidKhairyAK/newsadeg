import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes } from '@/store/helpers'
import { logout } from '@/store/auth'

import { subscribeOrderList } from './subscribers'

const initialState = {
	unsubscribers: {
		orderList: null,
		orderDetail: null
	}
}

const rawUnsubscribe = (state, action) => {
	try {
		const unsubscriber = state.unsubscribers[action.payload]
		if (unsubscriber) {
			unsubscriber()
			state.unsubscribers[action.payload] = null
		}
	} catch (err) {
		console.error(err)
		throw err
	}
}

const rawUnsubscribeAll = state => {
	try {
		Object.keys(state.unsubscribers).forEach(key => {
			const unsubscriber = state.unsubscribers[key]
			if (unsubscriber) {
				unsubscriber()
				state.unsubscribers[key] = null
			}
		})
	} catch (err) {
		console.error(err)
		throw err
	}
}

const slice = createSlice({
	name: 'event',
	initialState: { ...initialState },
	reducers: {
		unsubscribe: rawUnsubscribe,
		unsubscribeAll: rawUnsubscribeAll
	},
	extraReducers: builder => { builder
		.addCase(logout.fulfilled, rawUnsubscribeAll)
		.addMatcher(
			isActionIncludes([subscribeOrderList.fulfilled]),
			(state, { payload }) => {
				if (payload) state.unsubscribers[payload.name] = payload.function
			}
		)
	}
})

export * from './subscribers'

export const { unsubscribe, unsubscribeAll } = slice.actions

export default slice.reducer