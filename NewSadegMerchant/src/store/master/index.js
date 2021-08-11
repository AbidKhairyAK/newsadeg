import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes } from '@/store/helpers'
import { logout } from '@/store/auth'

import { getCategories } from './thunks'

const initialState = {
	isLoading: {
		category: false
	},
	categories: [],
}

const slice = createSlice({
	name: 'master',
	initialState: { ...initialState },
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload
		},
	},
	extraReducers: builder => { builder
		.addMatcher(
			isActionIncludes([logout.fulfilled]),
			state => ({ ...initialState })
		)
		.addMatcher(
			isActionIncludes([getCategories.pending]),
			state => {
				state.isLoading.category = true
			}
		)
		.addMatcher(
			isActionIncludes([getCategories.fulfilled, getCategories.rejected]),
			state => {
				state.isLoading.category = false
			}
		)
	}
})

export * from './thunks'

export const { setCategories } = slice.actions

export default slice.reducer