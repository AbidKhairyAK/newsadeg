import { createAsyncThunk } from '@reduxjs/toolkit'
import { MenuCategoryService } from '@/services'

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