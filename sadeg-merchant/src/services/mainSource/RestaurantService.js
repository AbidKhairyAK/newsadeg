import axios from 'axios'

import { getRestaurant } from '@/helpers'

const services = {
	getProfile (accessToken) {
		const config = !accessToken ? null : { headers: { Authorization: 'Bearer ' + accessToken } }
		return axios.post('/restaurant/me', null, config)
	},
	create (payload) {
		return axios.post('/restaurants', payload)
	},
	update (payload) {
		return axios.post('/restaurants/' + getRestaurant().id, payload)
	},
	updateStatus (status) {
		return axios.post('/restaurants/' + getRestaurant().id, {
			restaurant_status: status // open | close | suspend
		})
	},
	checkEmail (email) {
		return axios.post('/restaurants/check-email', { email })
	}
}

export default services