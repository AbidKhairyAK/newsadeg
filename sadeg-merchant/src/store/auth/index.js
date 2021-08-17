import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes } from '@/store/helpers'

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
		.addMatcher(
			isActionIncludes([authenticate.pending, logout.pending]),
			state => {
				state.isLoading = true
			}
		)
		.addMatcher(
			isActionIncludes([authenticate.rejected, authenticate.fulfilled, logout.rejected, logout.fulfilled]),
			state => {
				state.isLoading = false
			}
		)
	}
})

export * from './thunks'

export const { login, reset } = slice.actions

export default slice.reducer