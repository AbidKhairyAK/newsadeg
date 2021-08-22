import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '@/services'
import { storage } from '@/utils'
import { showMessage } from 'react-native-flash-message'

export const authenticate = createAsyncThunk(
	'auth/authenticate', 
	async (credentials) => {
		try {
			const res = await AuthService.login(credentials)
			await storage.setItem('token', res)
			return res
		} catch (err) {
			if ([401, 400].includes(err?.response?.status)) showMessage({
				message: 'Email or password is incorrect',
				type: 'danger',
				icon: 'danger',
				duration: 5000
			})
			else if (err.response) showMessage({
				message: err.response.data.message || err.response.data.error || err.response.data,
				type: 'danger',
				icon: 'danger',
duration: 5000
			})
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