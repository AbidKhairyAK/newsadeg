import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes, getLoadingStatus } from '@/store/helpers'
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

const getLoadingType = action => {
	const loadingMap = {
		getCategories: 'category',
		getMenus: 'menu',
		getRestaurantDrivers: 'restaurant_driver',
	}
	return loadingMap[action.type.split('/')[1]]
}

const getStateName = action => {
	const stateMap = {
		getCategories: 'categories',
		getMenus: 'menus',
		getRestaurantDrivers: 'restaurant_drivers',
	}
	return stateMap[action.type.split('/')[1]]
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
		.addCase(logout.fulfilled, () => ({ ...initialState }))
		.addMatcher(
			isActionIncludes([getCategories.fulfilled, getMenus.fulfilled, getRestaurantDrivers.fulfilled]),
			(state, action) => { 
				state[getStateName(action)] = action.payload 
			}
		)
		.addMatcher(
			isActionIncludes([
				getCategories.pending, getCategories.fulfilled, getCategories.rejected,
				getMenus.pending, getMenus.fulfilled, getMenus.rejected,
				getRestaurantDrivers.pending, getRestaurantDrivers.fulfilled, getRestaurantDrivers.rejected
			]),
			(state, action) => { 
				state.isLoading[getLoadingType(action)] = getLoadingStatus(action) 
			}
		)
	}
})

export * from './thunks'

export const { setCategories, setMenus, setRestaurantDrivers } = slice.actions

export default slice.reducer