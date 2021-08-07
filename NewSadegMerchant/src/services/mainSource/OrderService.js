import axios from 'axios'
import { getUser } from '@/helpers'

const services = {
	getList (type, page, perPage) {
		return axios.get(`/restaurants/${getUser().id}/orders`, {
			params: { type, page, perPage }
		})
	},
}

export default services