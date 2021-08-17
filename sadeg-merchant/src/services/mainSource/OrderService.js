import axios from 'axios'
import { getRestaurant } from '@/helpers'

const services = {
	getList (type, page, perPage) {
		return axios.get(`/restaurants/${getRestaurant().id}/orders`, {
			params: { type, page, perPage }
		})
	},
}

export default services