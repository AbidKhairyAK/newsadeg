import axios from 'axios'
import { getRestaurant } from '@/helpers'

const services = {
	getList (type, page, perPage) {
		return axios.get(`/restaurants/${getRestaurant().id}/orders`, {
			params: { type, page, perPage }
		})
	},
	update (id, payload) {
		return axios.post(`/orders/${id}`, payload)
	},
	cancel (id) {
		return axios.get(`/orders/${id}/cancel-order`)
	},

}

export default services