import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '@/services'
import { storage } from '@/utils'

export const authenticate = createAsyncThunk(
	'auth/authenticate', 
	async (credentials) => {
		try {
			const res = await AuthService.login(credentials)
			await storage.setItem('token', res)
			return res
		} catch (err) {
			if ([401, 400].includes(err?.response?.status)) alert('Email or password is incorrect')
			else if (err.response) alert(err.response.data.message || err.response.data.error || err.response.data)
			throw err
		}
	}
)

export const logout = createAsyncThunk(
	'auth/logout', 
	async () => {
		try {
			await storage.removeItem('token')
		} catch (err) {
			console.error(err)
			throw err
		}
	}
)