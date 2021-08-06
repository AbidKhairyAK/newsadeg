import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService, axiosInit } from '@/services'
import { storage } from '@/utils'

export const authenticate = createAsyncThunk('auth/authenticate', async (credentials, { dispatch }) => {
	try {
		const loginRes = await AuthService.login(credentials)
		const profileRes = await AuthService.getProfile(loginRes.access_token)

		await storage.setItem('token', loginRes)
		await storage.setItem('user', profileRes)

		dispatch({ type: 'auth/login', payload: {
			token: loginRes,
			user: profileRes
		}})
	} catch (err) {
		if ([401, 400].includes(err?.response?.status)) alert('Email or password is incorrect')
		else if (err.response) alert(err.response.data.message || err.response.data.error || err.response.data)
		throw err
	}
})

export const logout = createAsyncThunk('auth/logout', async (arg, { dispatch }) => {
	try {
		await storage.removeItem('token')
		dispatch({ type: 'auth/reset' })
	} catch (err) {
		console.error(err)
		throw err
	}
})