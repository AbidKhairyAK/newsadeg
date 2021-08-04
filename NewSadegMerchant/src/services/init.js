import axios from 'axios'

import store from '@/store'
import { login } from '@/store/auth'
import { storage } from '@/utils'
import { MAIN_SOURCE_URL } from '@/config'

export const axiosInit = async () => {
	axios.defaults.baseURL = MAIN_SOURCE_URL

	axios.interceptors.response.use(
		res => {
			const isRootRes = 'headers' in res && 'config' in res && 'request' in res
			return isRootRes ? res.data : res
		},
		err => Promise.reject(err)
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