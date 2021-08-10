import { createSlice } from '@reduxjs/toolkit'

import { isActionIncludes } from '@/store/helpers'
import { logout } from '@/store/auth'

const initialState = {
	categories: []
}

const slice = createSlice({
	name: 'master',
	initialState: { ...initialState },
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload
		}
	},
	extraReducers: builder => { builder
		.addMatcher(
			isActionIncludes([logout.fulfilled]),
			state => ({ ...initialState })
		)
	}
})

export * from './thunks'

export const { setCategories } = slice.actions

export default slice.reducer