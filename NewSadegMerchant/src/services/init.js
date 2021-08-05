import axios from 'axios'

import store from '@/store'
import { login, logout } from '@/store/auth'
import { storage } from '@/utils'
import { MAIN_SOURCE_URL } from '@/config'

export const axiosInit = async () => {
	axios.defaults.baseURL = MAIN_SOURCE_URL

	// shorten res.data to res
	axios.interceptors.response.use(
		res => {
			const isRootRes = 'headers' in res && 'config' in res && 'request' in res
			return isRootRes ? res.data : res
		},
		err => Promise.reject(err)
	)

	// global error handler
	axios.interceptors.response.use(
		res => res,
		err => {
			const ignoredUrls = ['/restaurant/login']

			if (err.response) {
				if (!ignoredUrls.includes(err.response?.config?.url)) {
					// handle unauthorized error
					if ([400, 401].includes(err.response.status)) store.dispatch(logout())
					console.error(err.response)
					alert(err.response.data.error || err.response.data.message)
				}
			} else {
				console.error(err)
				alert(err.message)
			}

			throw err
		}
	)

	const storedToken = await storage.getItem('token')

	axios.interceptors.request.use(
		config => {
			if (storedToken) config.headers.Authorization = 'Bearer ' + storedToken.access_token
			else delete config.headers.Authorization
			
			return config
		},
		err => Promise.reject(err)
	)
}

export const authInit = async () => {
	const storedToken = await storage.getItem('token')
	if (storedToken) store.dispatch(login(storedToken))
	return storedToken
}