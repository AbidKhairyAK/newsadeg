import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes } from '@/store/helpers'
import { logout } from '@/store/auth'

import { getCategories, getMenus } from './thunks'

const initialState = {
	isLoading: {
		category: false,
		menu: false
	},
	categories: [],
	menus: [],
}

const slice = createSlice({
	name: 'master',
	initialState: { ...initialState },
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload
		},
		setMenus: (state, action) => {
			state.menus = action.payload
		},
	},
	extraReducers: builder => { builder
		.addMatcher(
			isActionIncludes([logout.fulfilled]),
			state => ({ ...initialState })
		)
		.addMatcher(
			isActionIncludes([getCategories.pending]),
			state => { state.isLoading.category = true }
		)
		.addMatcher(
			isActionIncludes([getCategories.fulfilled, getCategories.rejected]),
			state => { state.isLoading.category = false }
		)
		.addMatcher(
			isActionIncludes([getMenus.pending]),
			state => { state.isLoading.menu = true }
		)
		.addMatcher(
			isActionIncludes([getMenus.fulfilled, getMenus.rejected]),
			state => { state.isLoading.menu = false }
		)
	}
})

export * from './thunks'

export const { setCategories, setMenus } = slice.actions

export default slice.reducer