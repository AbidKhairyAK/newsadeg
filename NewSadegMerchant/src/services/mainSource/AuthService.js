import axios from 'axios'

const services = {
	login (payload) {
		return axios.post('/restaurant/login', payload)
	}
}

export default services