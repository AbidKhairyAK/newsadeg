import { createAsyncThunk } from '@reduxjs/toolkit'
import { MenuCategoryService, MenuService, RestaurantDriverService } from '@/services'

export const getCategories = createAsyncThunk(
	'master/getCategories',
	async (payload, { dispatch }) => {
		try {
			const res = await MenuCategoryService.getList()
			dispatch({ type: 'master/setCategories', payload: res })
		} catch (err) {
			throw err
		}
	}
)

export const getMenus = createAsyncThunk(
	'master/getMenus',
	async (payload, { dispatch }) => {
		try {
			const res = await MenuService.getList()
			dispatch({ type: 'master/setMenus', payload: res })
		} catch (err) {
			throw err
		}
	}
)

export const getRestaurantDrivers = createAsyncThunk(
	'master/getRestaurantDrivers',
	async (payload, { dispatch }) => {
		try {
			const res = await RestaurantDriverService.getList()
			dispatch({ type: 'master/setRestaurantDrivers', payload: res })
		} catch (err) {
			throw err
		}
	}
)