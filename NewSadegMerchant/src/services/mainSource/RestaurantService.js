import axios from 'axios'

const services = {
	create (payload) {
		return axios.post('/restaurants', payload)
	}
}

export default services