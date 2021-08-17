import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '@/services'
import { storage } from '@/utils'

export const authenticate = createAsyncThunk(
	'auth/authenticate', 
	async (credentials, { dispatch }) => {
		try {
			const res = await AuthService.login(credentials)

			await storage.setItem('token', res)

			dispatch({ type: 'auth/login', payload: res })
		} catch (err) {
			if ([401, 400].includes(err?.response?.status)) alert('Email or password is incorrect')
			else if (err.response) alert(err.response.data.message || err.response.data.error || err.response.data)
			throw err
		}
	}
)

export const logout = createAsyncThunk(
	'auth/logout', 
	async (arg, { dispatch }) => {
		try {
			await storage.removeItem('token')
			dispatch({ type: 'auth/reset' })
		} catch (err) {
			console.error(err)
			throw err
		}
	}
)