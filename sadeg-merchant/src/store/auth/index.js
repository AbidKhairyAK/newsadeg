import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes, getLoadingStatus } from '@/store/helpers'

import { authenticate, logout } from './thunks'

const initialState = {
	isLoading: false,
	isLogin: false,
	token: {}
}

const slice = createSlice({
	name: 'auth',
	initialState: { ...initialState },
	reducers: {
		reset: () => ({ ...initialState }),
		login: (state, action) => {
			state.isLogin = true
			state.token = action.payload
		},
	},
	extraReducers: builder => { builder
		.addCase(logout.fulfilled, () => ({ ...initialState }))
		.addCase(authenticate.fulfilled, (state, action) => {
			state.isLogin = true
			state.token = action.payload
		})
		.addMatcher(
			isActionIncludes([
				authenticate.pending, authenticate.fulfilled, authenticate.rejected, 
				logout.pending, logout.fulfilled, logout.rejected
			]),
			(state, action) => { state.isLoading = getLoadingStatus(action) }
		)
	}
})

export * from './thunks'

export const { login, reset } = slice.actions

export default slice.reducer