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
	updateStatus (status) {
		return axios.post('/restaurants/' + getRestaurant().id, {
			restaurant_status: status // open | close | suspend
		})
	}
}

export default services