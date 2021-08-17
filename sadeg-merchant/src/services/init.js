import axios from 'axios'

import store from '@/store'
import { login, logout } from '@/store/auth'
import { storage } from '@/utils'
import { MAIN_SOURCE_URL } from '@/config'

export const axiosInit = async () => {
	// add baseURL
	axios.defaults.baseURL = MAIN_SOURCE_URL

	// add token to every request
	const storedToken = await storage.getItem('token')
	axios.defaults.headers.common['Authorization'] = storedToken ?  'Bearer ' + storedToken.access_token : null

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
					console.error('response err', err.response)
					alert(err.response.data.error || err.response.data.message || err.response.data)
						
					// handle unauthorized error
					if ([400, 401].includes(err.response.status)) store.dispatch(logout())
				}
			} else {
				console.error(err.request)
				console.error(err)
				alert(err.message)
			}

			throw err
		}
	)
}

export const authInit = async () => {
	const storedToken = await storage.getItem('token')

	if (storedToken) store.dispatch(login(storedToken))

	return storedToken
}