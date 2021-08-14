import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes } from '@/store/helpers'
import { logout } from '@/store/auth'

import { getCategories, getMenus, getRestaurantDrivers } from './thunks'

const initialState = {
	isLoading: {
		category: false,
		menu: false,
		restaurant_driver: false,
	},
	categories: [],
	menus: [],
	restaurant_drivers: [],
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
		setRestaurantDrivers: (state, action) => {
			state.restaurant_drivers = action.payload
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
		.addMatcher(
			isActionIncludes([getRestaurantDrivers.pending]),
			state => { state.isLoading.restaurant_driver = true }
		)
		.addMatcher(
			isActionIncludes([getRestaurantDrivers.fulfilled, getRestaurantDrivers.rejected]),
			state => { state.isLoading.restaurant_driver = false }
		)
	}
})

export * from './thunks'

export const { setCategories, setMenus, setRestaurantDrivers } = slice.actions

export default slice.reducer