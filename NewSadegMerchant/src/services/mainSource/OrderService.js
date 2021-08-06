import axios from 'axios'

const services = {
	getList (type) {
		return axios.get('/restaurants/{id}/orders', {
			params: { type }
		})
	},
}

export default services