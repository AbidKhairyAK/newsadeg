import { createAsyncThunk } from '@reduxjs/toolkit'
import { MenuCategoryService, MenuService, RestaurantDriverService } from '@/services'

export const getCategories = createAsyncThunk(
	'master/getCategories',
	async () => {
		try {
			const res = await MenuCategoryService.getList()
			return res
		} catch (err) {
			throw err
		}
	}
)

export const getMenus = createAsyncThunk(
	'master/getMenus',
	async () => {
		try {
			const res = await MenuService.getList()
			return res
		} catch (err) {
			throw err
		}
	}
)

export const getRestaurantDrivers = createAsyncThunk(
	'master/getRestaurantDrivers',
	async () => {
		try {
			const res = await RestaurantDriverService.getList()
			return res
		} catch (err) {
			throw err
		}
	}
)