import axios from 'axios'

const services = {
	login (payload) {
		return axios.post('/restaurant/login', payload)
	},
	getProfile (accessToken) {
		const config = !accessToken ? null : { headers: { Authorization: 'Bearer ' + accessToken } }
		console.log('service config', config)
		return axios.post('/restaurant/me', null, config)
	},
}

export default services