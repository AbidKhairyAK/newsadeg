import axios from 'axios'

import { getUser } from '@/helpers'

const services = {
	getData () {
		return axios.get('/restaurants/' + getUser().id)
	},
	create (payload) {
		return axios.post('/restaurants', payload)
	},
	updateStatus (status) {
		return axios.post('/restaurants/' + getUser().id, {
			restaurant_status: status // open | close | suspend
		})
	}
}

export default services