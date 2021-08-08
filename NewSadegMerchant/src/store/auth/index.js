import { createSlice } from '@reduxjs/toolkit'
import { isActionIncludes } from '@/store/helpers'

import { authenticate, logout } from './thunks'

const initialState = {
	isLoading: false,
	isLogin: false,
	token: {},
	user: {}
}

const authSlice = createSlice({
	name: 'auth',
	initialState: { ...initialState },
	reducers: {
		reset: () => ({ ...initialState }),
		login: (state, action) => {
			state.isLogin = true
			console.log(action.payload)
			state.token = action.payload.token
			state.user = action.payload.user
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

export const { login, reset } = authSlice.actions

export default authSlice.reducer